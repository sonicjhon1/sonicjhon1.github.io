import { PrismaClient } from '@prisma/client';
import pino from 'pino';

export const prisma = new PrismaClient();
prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
    return result;
});

export const logger = pino({ level: process.env.LOG_LEVEL || 'debug' });