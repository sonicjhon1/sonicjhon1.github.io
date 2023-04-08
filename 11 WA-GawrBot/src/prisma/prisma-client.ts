import { PrismaClient } from "@prisma/client";
import type { SocketConfig } from "@adiwajshing/baileys";
import { DEFAULT_CONNECTION_CONFIG } from "@adiwajshing/baileys";

let prisma: PrismaClient | null = null;
let logger: SocketConfig["logger"] | null = null;

export function setPrisma(prismaClient: PrismaClient) {
	prisma = prismaClient;
	prisma.$use(async (params, next) => {
		const before = Date.now();
		const result = await next(params);
		const after = Date.now();
		console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
		return result;
	});
}

export function setLogger(pinoLogger?: SocketConfig["logger"]) {
	logger = pinoLogger || DEFAULT_CONNECTION_CONFIG.logger;
}

export function usePrisma() {
	console.error(prisma, "Prisma client cannot be used before initialization");
	return prisma;
}

export function useLogger() {
	console.error(logger, "Pino logger cannot be used before initialization");
	return logger;
}