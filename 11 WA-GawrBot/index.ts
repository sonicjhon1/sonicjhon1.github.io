import { Boom } from '@hapi/boom'
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeInMemoryStore, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } from '@adiwajshing/baileys'
import MAIN_LOGGER from '@adiwajshing/baileys/lib/Utils/logger'
const { httpServer } = require('./src/http-server')
const { prismaHandler } = require('./src/prisma/prisma-handle')

// Configuration
const authFile: string = "baileys_store_multi.json"

const logger = MAIN_LOGGER.child({ })
logger.level = 'trace'

const deviceInfoOS: string = "Gawr"
const deviceInfoBrowser: string = "Chrome"
const deviceInfoBrowserVersion: string = "111.0"

const store = makeInMemoryStore({ logger })
store?.readFromFile(authFile)
setInterval(() => {	store?.writeToFile(authFile)}, 10_000)


// Main Sock function
const startSock = async() => {
	const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')

	const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`WA version: ${version.join('.')}, isLatest: ${isLatest}`)

	const sock = makeWASocket({
		version,
		printQRInTerminal: true,
		auth: {
			creds: state.creds,
			/** caching makes the store faster to send/recv messages */
			keys: makeCacheableSignalKeyStore(state.keys, logger),
		},
		browser: [deviceInfoOS, deviceInfoBrowser, deviceInfoBrowserVersion],
		generateHighQualityLinkPreview: true,
		// ignore all broadcast messages -- to receive the same
		// comment the line below out
		// shouldIgnoreJid: jid => isJidBroadcast(jid),
		// implement to handle retries & poll updates
		getMessage,
	})

	store?.bind(sock.ev)

	const sendMessageWTyping = async(msg: AnyMessageContent, jid: string) => {
		await sock.presenceSubscribe(jid)
		await delay(500)

		await sock.sendPresenceUpdate('composing', jid)
		await delay(2000)

		await sock.sendPresenceUpdate('paused', jid)

		await sock.sendMessage(jid, msg)
	}

	// process all events that just occurred efficiently in a batch
	sock.ev.process(
		async(events) => {
			// something about the connection changed
			if(events['connection.update']) {
				const update = events['connection.update']
				const { connection, lastDisconnect } = update
				if(connection === 'close') {
					// reconnect if not logged out
					if((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
						startSock()
					} else {
						console.log('Connection closed. You are logged out.')
					}
				}

				console.log('Connection updated: ', update)
			}

			if(events['creds.update']) {
				await saveCreds()
			}

			if(events.call) {
				console.log('Event called: ', events.call)
			}

			if(events['messaging-history.set']) {
				const { chats, contacts, messages, isLatest } = events['messaging-history.set']
				console.log(`Sync status: ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (latest: ${isLatest})`)
			}

			if(events['messages.upsert']) {
				const upsert = events['messages.upsert']
				console.log('New Message: ', JSON.stringify(upsert, undefined, 2))

				if(upsert.type === 'notify') {
					for(const msg of upsert.messages) {
						//if(!msg.key.fromMe && doReplies) {
						//	console.log('replying to', msg.key.remoteJid)
						//	await sock!.readMessages([msg.key])
						//	await sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid!)
						//}
					}
				}
			}

			if(events['messages.update']) {
				console.log(`Message status updated: ${JSON.stringify(events['messages.update'], undefined, 2)}`)

				for(const { key, update } of events['messages.update']) {
					if(update.pollUpdates) {
						const pollCreation = await getMessage(key)
						if(pollCreation) {
							console.log(
								'Poll update. Code was removed, need to be reimplemented.'
							)
						}
					}
				}
			}

			if(events['message-receipt.update']) {
				//console.log(events['message-receipt.update'])
			}

			if(events['messages.reaction']) {
				//console.log(events['messages.reaction'])
			}

			if(events['presence.update']) {
				//console.log(events['presence.update'])
			}

			if(events['chats.update']) {
				//console.log(events['chats.update'])
			}

			if(events['contacts.update']) {
				for(const contact of events['contacts.update']) {
					if(typeof contact.imgUrl !== 'undefined') {
						const newUrl = contact.imgUrl === null
							? null
							: await sock!.profilePictureUrl(contact.id!).catch(() => null)
						console.log(
							`Contact updated: ${contact.id} has a new profile, ${newUrl}`,
						)
					}
				}
			}

			if(events['chats.delete']) {
				console.log('Chats deleted: ', events['chats.delete'])
			}
		}
	)

	return sock

	async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
		if(store) {
			const msg = await store.loadMessage(key.remoteJid!, key.id!)
			return msg?.message || undefined
		}

		// only if store is present
		return proto.Message.fromObject({})
	}
}


// Startup
httpServer(authFile)
prismaHandler()
startSock()