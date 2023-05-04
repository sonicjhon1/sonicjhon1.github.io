import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { SocketConfig } from "@adiwajshing/baileys";
import { DEFAULT_CONNECTION_CONFIG } from "@adiwajshing/baileys";
import pino from 'pino';

let prisma: PrismaClient | null = null;
let logger: SocketConfig["logger"] | null = null;

export function setPrisma(prismaClient: PrismaClient) {
	prisma = prismaClient;
}

export function setLogger(pinoLogger?: SocketConfig["logger"]) {
	logger = pinoLogger || DEFAULT_CONNECTION_CONFIG.logger;
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

export function useLogger() {
	if (!logger) {
		console.error("Pino logger cannot be used before initialization. Initializing a new Pino logger.");
		return pino({ level: process.env.LOG_LEVEL || 'debug' });
	}
	return logger;
}