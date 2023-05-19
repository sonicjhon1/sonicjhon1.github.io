import { GroupChat, type Client, type Message } from "whatsapp-web.js";
import { useDB } from "../../../shared-clients";

const db = useDB();

export function messageEvent(wa: Client, sessionId: string) {
	const message = async (msg: Message) => {
		const msgChat = await msg.getChat();
		const msgContact = await msg.getContact();
		const msgMedia = await msg.downloadMedia().catch((e) => void 0);
		const msgObject = msg;

		let messageAuthor = msgContact.id._serialized;
		let messageName = msgContact.name || msgContact.pushname;
		const messageHasMedia = msg.hasMedia;
		let messageBody = msg.hasMedia && msgMedia ? "data:" + msgMedia.mimetype + ";base64," + msgMedia.data : msg.body;
		let messageCaption = msg.body;
		const messageType = msg.type;
		const messageTimestamp = msg.timestamp;
		const messageFromMe = msgContact.isMe;
		const messageId = msgObject.id.id;
		const messageObject = msgObject;

		let chatName = msgChat.name;
		const chatPhone = msgChat.id._serialized;
		const chatProfile = encodeURIComponent(await (await msgChat.getContact()).getProfilePicUrl());
		const chatIsArchived = msgChat.archived || false;
		// @ts-expect-error
		const chatIsPinned: boolean = msgChat.pinned || false;

		// Catch status broadcasts
		if (chatPhone == "status@broadcast") {
			chatName = "Status Broadcast";
		}

		if (messageFromMe) {
			messageAuthor = wa.info.wid._serialized;
			messageName = wa.info.pushname;
		}

		// Escaping characters for JSON
		messageBody = messageBody.replace(/\\/g, "\\\\");
		messageBody = messageBody.replace(/\b/g, "");
		messageBody = messageBody.replace(/\f/g, "\\f");
		messageBody = messageBody.replace(/\n/g, "\\n");
		messageBody = messageBody.replace(/\r/g, "\\r");
		messageBody = messageBody.replace(/\t/g, "\\t");
		messageBody = messageBody.replace(/\"/g, '\\"');
		messageCaption = messageCaption.replace(/\\/g, "\\\\");
		messageCaption = messageCaption.replace(/\b/g, "");
		messageCaption = messageCaption.replace(/\f/g, "\\f");
		messageCaption = messageCaption.replace(/\n/g, "\\n");
		messageCaption = messageCaption.replace(/\r/g, "\\r");
		messageCaption = messageCaption.replace(/\t/g, "\\t");
		messageCaption = messageCaption.replace(/\"/g, '\\"');
		messageBody = encodeURIComponent(messageBody);
		messageCaption = encodeURIComponent(messageCaption);

		await db
			.insertInto("Message")
			.values({
				id: messageId,
				sessionId,
				messageChat: chatPhone,
				messageAuthor,
				messageName,
				messageHasMedia,
				messageBody,
				messageCaption,
				messageType,
				messageTimestamp,
				messageFromMe,
				messageObject,
			})
			.execute();

		let chatMessageLatest = await db
			.selectFrom("Message")
			.select(["messageAuthor", "messageBody", "messageCaption", "messageFromMe", "messageHasMedia", "messageName", "messageType", "messageTimestamp"])
			.where("messageChat", "==", chatPhone)
			.orderBy("messageTimestamp", "desc")
			.executeTakeFirst();
		if (chatMessageLatest?.messageHasMedia) {
			let messageTypeCapitalized = `[${messageType[0].toUpperCase() + messageType.slice(1)}]`;
			chatMessageLatest.messageBody = messageCaption || messageTypeCapitalized || "[Media]";
		}
		await db
			.insertInto("Chat")
			.values({ id: chatPhone, sessionId, chatName, chatPhone, chatIsArchived, chatIsPinned, chatProfile, chatMessageLatest, chatMessageTimestamp: chatMessageLatest?.messageTimestamp })
			.onDuplicateKeyUpdate({
				chatName,
				chatIsArchived,
				chatIsPinned,
				chatProfile,
				chatMessageLatest,
				chatMessageTimestamp: chatMessageLatest?.messageTimestamp,
			})
			.execute();
		if (msgChat.isGroup) {
			const participantChat = await wa.getChatById(messageAuthor);

			let chatName = participantChat.name;
			const chatPhone = participantChat.id._serialized;
			const chatProfile = encodeURIComponent(await (await participantChat.getContact()).getProfilePicUrl());
			const chatIsArchived = participantChat.archived || false;
			// @ts-expect-error
			const chatIsPinned: boolean = participantChat.pinned || false;

			// Catch status broadcasts
			if (chatPhone == "status@broadcast") {
				chatName = "Status Broadcast";
			}

			if (messageFromMe) {
				messageAuthor = wa.info.wid._serialized;
				messageName = wa.info.pushname;
			}

			await db
				.insertInto("Chat")
				.values({ id: chatPhone, sessionId, chatName, chatPhone, chatIsArchived, chatIsPinned, chatProfile })
				.onDuplicateKeyUpdate({
					chatName,
					chatIsArchived,
					chatIsPinned,
					chatProfile,
				})
				.execute();
		}

		wa.emit("createdMessage", chatPhone);

		console.log(`
			Number: ${messageAuthor}, 
			Name: ${messageName},
			Has Media: ${messageHasMedia},
			Body: ${messageBody.substring(0, 100)},
			Caption: ${messageCaption},
			Type: ${messageType},
			Timestamp; ${messageTimestamp},
			Me: ${messageFromMe},
		`);

		if (!msg.fromMe) return;
		if (msg.body === "restart") {
			await wa.destroy().catch((e) => console.log(e));
			await wa.initialize();
		}
		if (msg.body === "info" && msg.hasQuotedMsg) {
			const quotedMsg = await msg.getQuotedMessage();
			const name = (await quotedMsg.getContact()).name || (await quotedMsg.getContact()).pushname;
			const reply = `
				Author Number: ${quotedMsg.author || quotedMsg.from},
				Author Name: ${name},
				Has Media: ${quotedMsg.hasMedia},
				Type: ${quotedMsg.type},
				Timestamp: ${quotedMsg.timestamp},
				Me: ${quotedMsg.fromMe}
			`;
			quotedMsg.reply(reply);
		}
		if (msg.body === "wid") {
			msg.reply(JSON.stringify(wa.info));
		}
	};

	const listen = () => {
		//wa.on("message", message);
		wa.on("message_create", message);
	};

	const unlisten = () => {
		//wa.off("message", message);
		wa.off("message_create", message);
	};

	return { listen, unlisten };
}
