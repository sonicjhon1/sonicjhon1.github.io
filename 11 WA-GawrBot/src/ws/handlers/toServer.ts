import type { Server } from "socket.io";
import { useDB, useWA, getWASession } from "../../shared-clients";
import { Chat, GroupChat } from "whatsapp-web.js";

export function toServerEvent(io: Server) {
	let listening = false;

	const wa = useWA();
	const db = useDB();
	const sessionId = getWASession();

	const sendMessageMentionAll = async (chatId: string, messageBody: string, callback: any) => {
		if (!wa) return;

		const chat = (await wa.getChatById(chatId)) as GroupChat;
		await chat.sendMessage(messageBody || "@everyone", {
			// @ts-expect-error
			mentions: chat.participants,
		});
		callback(true);
	};

	const sendMessage = async (chatId: string, messageBody: string, callback: any) => {
		if (!wa) return;

		const chat = (await wa.getChatById(chatId)) as Chat;
		await chat.sendMessage(messageBody);
		callback(true);
	};

	const listen = () => {
		if (listening || !wa) return;

		io.on("connection", (socket) => {
			socket.on("sendMessageMentionAll", sendMessageMentionAll);
			socket.on("sendMessage", sendMessage);
		});
		listening = true;
	};

	const unlisten = () => {
		if (!listening) return;

		io.off("connection", (socket) => {
			socket.off("sendMessageMentionAll", sendMessageMentionAll);
			socket.off("sendMessage", sendMessage);
		});
		listening = false;
	};

	return { listen, unlisten };
}
