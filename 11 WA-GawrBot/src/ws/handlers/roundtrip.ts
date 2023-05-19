import type { Server } from "socket.io";
import { useDB, useWA } from "../../shared-clients";
import fetch from "node-fetch";
import { sql, expressionBuilder } from "kysely";

const db = useDB();
const eb = expressionBuilder;

export function roundTripEvent(io: Server) {
	const wa = useWA();
	let listening = false;

	const ping = async (...args: any[]) => {
		console.log("Event: Ping. Args:", args);
		io.emit("pong");
	};

	const fetchInit = async () => {
		const chats = await db
			.selectFrom("Chat")
			.select(["chatName", "chatPhone", "chatProfile", "chatIsArchived", "chatIsPinned", "chatMessageLatest", "chatMessageTimestamp"])
			.orderBy("chatIsPinned", "desc")
			.orderBy("chatIsArchived", "desc")
			.orderBy("chatMessageTimestamp", "desc")
			.execute();
		const prerender = await (await fetch((process.env.ASTRO_URL || "http://127.0.0.1:3006") + "/Chats?data=" + JSON.stringify(chats))).text();
		io.emit("reloadChat", prerender);
	};

	const fetchMain = async (chatPhone: string) => {
		const chat = await db.selectFrom("Chat").select(["chatName", "chatPhone", "chatProfile"]).where("chatPhone", "==", chatPhone).executeTakeFirst();
		const messages = await db
			.selectFrom("Message")
			.select(["id", "messageCaption", "messageFromMe", "messageName", "messageTimestamp", "messageHasMedia"])
			.select((eb) => eb.selectFrom("Chat").select(["chatProfile"]).whereRef("chatPhone", "is", sql.ref("$parent.messageAuthor")).as("messageProfile"))
			.where("messageChat", "=", chatPhone)
			.orderBy("messageTimestamp", "desc")
			.limit(50)
			.execute();

		const prerender = await (
			await fetch(
				(process.env.ASTRO_URL || "http://127.0.0.1:3006") +
					"/Main?data=" +
					JSON.stringify({
						chat,
						messages,
					})
			)
		).text();
		io.emit("reloadMain", prerender);
	};

	const fetchMedia = async (messageId: string, callback: any) => {
		const messages = await db.selectFrom("Message").select(["messageBody", "messageType"]).where("id", "=", `Message:${messageId}`).executeTakeFirst();

		callback(JSON.stringify(messages));
	};

	const listen = () => {
		if (listening) return;

		io.on("connection", (socket) => {
			socket.on("ping", ping);
			socket.on("fetchInit", fetchInit);
			socket.on("fetchMain", fetchMain);
			socket.on("fetchMedia", fetchMedia);
			wa?.on("createdMessage", fetchInit);
			wa?.on("createdMessage", fetchMain);
		});
		listening = true;
	};

	const unlisten = () => {
		if (!listening) return;

		io.off("connection", (socket) => {
			socket.off("ping", ping);
			socket.off("fetchInit", fetchInit);
			socket.off("fetchMain", fetchMain);
			socket.off("fetchMedia", fetchMedia);
			wa?.off("createdMessage", fetchInit);
			wa?.off("createdMessage", fetchMain);
		});
		listening = false;
	};

	return { listen, unlisten };
}
