import * as dotenv from "dotenv";
dotenv.config();
import type { DB } from "./generated/kysely/types";
import { SurrealKysely, SurrealDatabase, SurrealDbWebSocketsDialect } from "kysely-surrealdb";
import Surreal from "surrealdb.js";
import { Server } from "socket.io";
import { Client, LocalAuth } from "whatsapp-web.js";

let db: SurrealKysely<SurrealDatabase<DB>> | null = null;
let socketio: Server | null = null;
let wa: Client | null = null;
let sessionId: string | null = null;

export function setDB(kysely: SurrealKysely<SurrealDatabase<DB>>) {
	db = kysely;
}

export function setSocketio(server: Server) {
	socketio = server;
}

export function setWA(client: Client, sessionID: string) {
	wa = client;
	sessionId = sessionID;
}

export function useDB() {
	if (!db) {
		console.error("kysely - SurrealDB cannot be used before initialization. Initializing a new kysely - SurrealDB client.");
		db = new SurrealKysely<SurrealDatabase<DB>>({
			dialect: new SurrealDbWebSocketsDialect({
				Driver: Surreal,
				hostname: process.env.DATABASE_URL?.toString() || "127.0.0.1:8080",
				namespace: process.env.DATABASE_NAMESPACE?.toString() || "namespace",
				database: process.env.DATABASE_NAME?.toString() || "name",
				username: process.env.DATABASE_USERNAME?.toString() || "root",
				password: process.env.DATABASE_PASSWORD?.toString() || "root",
			}),
		});
	}
	return db;
}

export function useSocketio(): Server {
	if (!socketio) {
		console.error("Socket.io cannot be used before initialization. Initializing a new Socket.io server.");
		socketio = new Server(Number(process.env.SOCKET_PORT) || 3000, {
			cors: {
				origin: "*",
			},
		});
	}
	return socketio;
}

export function useWA(): Client | null {
	if (!wa) {
		console.error("WA cannot be used before initialization.");
	}
	return wa;
}

export function getWASession(): String {
	return sessionId || "";
}
