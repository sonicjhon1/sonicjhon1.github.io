import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();
prisma.$connect()

// Middleware
prisma.$use(async (params, next) => {
	const before = Date.now();
	const result = await next(params);
	const after = Date.now();
	console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
	return result;
});

export default prisma;
