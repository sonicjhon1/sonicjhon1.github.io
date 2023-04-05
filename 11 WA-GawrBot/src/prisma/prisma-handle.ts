import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function prismaHandler() {
	createUser("Hello, world!");
	createUser("123456789", "Lily!", "lilyProfile.png", true);
	getUsers();
}

async function createUser(phoneNumber: string, name?: string, profilePic?: string, pinned?: boolean) {
	const user = await prisma.user.create({
		data: {
			name: name,
			profilePic: profilePic,
			phoneNumber: phoneNumber,
			pinned: pinned,
		},
	});
	console.log(user);
}

async function getUsers() {
	const user = await prisma.user.findMany();
	console.log(user);
}

async function getMessages() {
	const message = await prisma.message.findMany();
	console.log(message);
}

module.exports = {
	prismaHandler,
};
