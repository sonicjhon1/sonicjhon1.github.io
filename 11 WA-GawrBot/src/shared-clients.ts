import { PrismaClient } from "./generated/client";
import { PrismaClientKnownRequestError } from "./generated/client/runtime/library";
import type { SocketConfig } from "@adiwajshing/baileys";
import { DEFAULT_CONNECTION_CONFIG } from "@adiwajshing/baileys";
import pino from "pino";
import { Server } from "socket.io";

let prisma: PrismaClient | null = null;
let logger: SocketConfig["logger"] | null = null;
let socketio: Server | null = null;

export function setPrisma(prismaClient: PrismaClient) {
	prisma = prismaClient;
}

export function setLogger(pinoLogger?: SocketConfig["logger"]) {
	logger = pinoLogger || DEFAULT_CONNECTION_CONFIG.logger;
}

export function setSocketio(server: Server) {
	socketio = server;
}

export function usePrisma() {
	if (!prisma) {
		console.error("Prisma client cannot be used before initialization. Initializing a new Prisma client.");
		return new PrismaClient();
	}
	return prisma;
}

export function usePrismaClientKnownRequestError() {
	return PrismaClientKnownRequestError;
}

export function useLogger(): SocketConfig["logger"] {
	if (!logger) {
		console.error("Pino logger cannot be used before initialization. Initializing a new Pino logger.");
		return pino({ level: process.env.LOG_LEVEL || "debug" });
	}
	return logger;
}

export function useSocketio(): Server {
	if (!socketio) {
		console.error("Socket.io cannot be used before initialization. Initializing a new Socket.io server.");
		return new Server(Number(process.env.SOCKET_PORT) || 3000);
	}
	return socketio;
}
