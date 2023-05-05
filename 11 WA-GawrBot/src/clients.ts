import { PrismaClient } from "./generated/client";
import pino from "pino";
import { Server } from "socket.io";

export const prisma = new PrismaClient();
prisma.$use(async (params, next) => {
	const before = Date.now();
	const result = await next(params);
	const after = Date.now();
	console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
	return result;
});

export const logger = pino({ level: process.env.LOG_LEVEL || "debug" });

export const socketio: Server = new Server(Number(process.env.SOCKET_PORT) || 3000, {
	cors: {
		origin: "*",
	},
});
