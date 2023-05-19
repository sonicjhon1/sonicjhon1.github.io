import { Kysely } from "kysely";
import type { DB } from "./generated/kysely/types"
import { SurrealDatabase, SurrealDbWebSocketsDialect } from "kysely-surrealdb";
import Surreal from "surrealdb.js";
import { Server } from "socket.io";

export const db = new Kysely<SurrealDatabase<DB>>({
	dialect: new SurrealDbWebSocketsDialect({
		Driver: Surreal,
		hostname: process.env.DATABASE_URL || "localhost:8080",
		namespace: process.env.DATABASE_NAMESPACE || "namespace",
		database: process.env.DATABASE_NAME ||"name",
		username: process.env.DATABASE_USERNAME || "root",
		password: process.env.DATABASE_PASSWORD || "root",
	}),
});

export const socketio: Server = new Server(Number(process.env.SOCKET_PORT) || 3000, {
	cors: {
		origin: "*",
	},
});
