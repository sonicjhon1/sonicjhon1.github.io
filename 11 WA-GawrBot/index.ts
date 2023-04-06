import { Boom } from "@hapi/boom";
import makeWASocket, {
	AnyMessageContent,
	delay,
	DisconnectReason,
	fetchLatestBaileysVersion,
	makeCacheableSignalKeyStore,
	makeInMemoryStore,
	proto,
	useMultiFileAuthState,
	WAMessageContent,
	WAMessageKey,
} from "@adiwajshing/baileys";
import MAIN_LOGGER from "@adiwajshing/baileys/lib/Utils/logger";
import * as fs from "fs";
import { httpServer } from "./src/http-server";
import { prismaHandler, upsertUser } from "./src/prisma/prisma-handle";

// Configuration
const baileysFolder: string = "baileys";
const authFile: string = baileysFolder + "/baileys_store_multi.json";
const authState: string = baileysFolder + "/baileys_auth_state";

const deviceInfoOS: string = "Gawr";
const deviceInfoBrowser: string = "Chrome";
const deviceInfoBrowserVersion: string = "111.0";

const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const store = makeInMemoryStore({ logger });
store?.readFromFile(authFile);
setInterval(() => {
	store?.writeToFile(authFile);
}, 10_000);

if (!fs.existsSync(baileysFolder)) {
	fs.mkdirSync(baileysFolder);
}

// Main Sock function
const startSock = async () => {
	const { state, saveCreds } = await useMultiFileAuthState(authState);

	const { version, isLatest } = await fetchLatestBaileysVersion();
	console.log(`WA version: ${version.join(".")}, isLatest: ${isLatest}`);

	const sock = makeWASocket({
		version,
		printQRInTerminal: true,
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, logger),
		},
		browser: [deviceInfoOS, deviceInfoBrowser, deviceInfoBrowserVersion],
		generateHighQualityLinkPreview: true,
		// ignore all broadcast messages -- to receive the same, uncomment the line below.
		// shouldIgnoreJid: jid => isJidBroadcast(jid),
		// implement to handle retries & poll updates.
		getMessage,
	});

	store?.bind(sock.ev);

	sock.ev.process(async (events) => {
		if (events["connection.update"]) {
			const update = events["connection.update"];
			const { connection, lastDisconnect } = update;
			if (connection === "close") {
				if ((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
					startSock();
				} else {
					console.log("Connection closed. You are logged out.");
				}
			}
			console.log("Connection updated: ", update);
		}

		if (events["creds.update"]) {
			await saveCreds();
		}

		// if(events.call) {
		// 	console.log('Event called: ', events.call)
		// }

		// if(events['messaging-history.set']) {
		// 	const { chats, contacts, messages, isLatest } = events['messaging-history.set']
		// 	console.log(`Sync status: ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (latest: ${isLatest})`)
		// }

		if (events["messages.upsert"]) {
			const upsert = events["messages.upsert"];
			if (upsert.messages[0].message?.protocolMessage?.type == proto.Message.ProtocolMessage.Type.HISTORY_SYNC_NOTIFICATION) {
				console.log("History Sync Progress: ", JSON.stringify(upsert.messages[0].message, undefined, 2));
				return;
			} else console.log("New Message: ", JSON.stringify(upsert, undefined, 2));

			//if(upsert.type === 'notify') {
			//	for(const msg of upsert.messages) {
			//		if(!msg.key.fromMe) {
			//			console.log('replying to', msg.key.remoteJid)
			//			await sock!.readMessages([msg.key])
			//			await sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid!, sock)
			//		}
			//	}
			//}

			upsert.messages.forEach(async (msg) => {
				if (typeof msg.key.remoteJid !== "string") {
					return;
				}

				let phoneNumber: string, name: string | undefined, profilePic: string | null | undefined, pinned;
				phoneNumber = msg.key.remoteJid;

				// User
				if (phoneNumber.endsWith("@s.whatsapp.net")) {
					phoneNumber = msg.key.remoteJid;
					name = store.contacts[phoneNumber]?.name || store.contacts[phoneNumber]?.notify || undefined;
					profilePic = await sock!.profilePictureUrl(phoneNumber).catch(() => null);
					if (typeof name == "undefined" && msg.key.fromMe == false) {
						name = msg.pushName || undefined;
					}

					upsertUser(phoneNumber, name!, profilePic!);
				}

				// Group
				if (phoneNumber.endsWith("@g.us")) {
					if (typeof msg.key.participant !== "string") {
						return;
					}

					// Handle group
					name = store.contacts[phoneNumber]?.name || store.contacts[phoneNumber]?.notify || undefined;
					profilePic = await sock!.profilePictureUrl(phoneNumber).catch(() => null);

					upsertUser(phoneNumber, name!, profilePic!);

					// Handle participant
					phoneNumber = msg.key.participant;
					name = store.contacts[phoneNumber]?.name || store.contacts[phoneNumber]?.notify || undefined;
					profilePic = await sock!.profilePictureUrl(phoneNumber).catch(() => null);
					if (typeof name == "undefined" && msg.key.fromMe == false) {
						name = msg.pushName || undefined;
					}

					upsertUser(phoneNumber, name!, profilePic!);
				}
			});
		}

		// if(events['messages.update']) {
		// 	console.log(`Message status updated: ${JSON.stringify(events['messages.update'], undefined, 2)}`)

		// 	for(const { key, update } of events['messages.update']) {
		// 		if(update.pollUpdates) {
		// 			const pollCreation = await getMessage(key)
		// 			if(pollCreation) {
		// 				console.log(
		// 					'Poll update. Code was removed, need to be reimplemented.'
		// 				)
		// 			}
		// 		}
		// 	}
		// }

		// if(events['message-receipt.update']) {
		// 	//console.log(events['message-receipt.update'])
		// }

		// if(events['messages.reaction']) {
		// 	//console.log(events['messages.reaction'])
		// }

		// if(events['presence.update']) {
		// 	//console.log(events['presence.update'])
		// }

		// if(events['chats.update']) {
		// 	//console.log(events['chats.update'])
		// }

		if (events["contacts.update"]) {
			for (const contact of events["contacts.update"]) {
				let phoneNumber: string | undefined, profilePic: string | null | undefined;
				if (typeof contact.imgUrl !== "undefined") {
					const newUrl = contact.imgUrl === null ? null : await sock!.profilePictureUrl(contact.id!).catch(() => null);
					phoneNumber = contact.id;
					profilePic = newUrl;
				}

				if (typeof phoneNumber == "string") {
					upsertUser(phoneNumber, undefined, profilePic!);
				}
				console.log(`Contact updated: ${contact.id}. ${contact}`);
			}
		}

		// if(events['chats.delete']) {
		// 	console.log('Chats deleted: ', events['chats.delete'])
		// }
	});

	return sock;
};

async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
	if (store) {
		const msg = await store.loadMessage(key.remoteJid!, key.id!);
		return msg?.message || undefined;
	}
	// only if store is present
	return proto.Message.fromObject({});
}

const sendMessageWTyping = async (msg: AnyMessageContent, jid: string, sock) => {
	await sock.presenceSubscribe(jid);
	await delay(500);
	await sock.sendPresenceUpdate("composing", jid);
	await delay(2000);
	await sock.sendPresenceUpdate("paused", jid);
	await sock.sendMessage(jid, msg);
};

// Startup
httpServer(authFile);
startSock();
