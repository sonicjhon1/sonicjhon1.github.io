import prisma from "./prisma-client";

async function prismaHandler() {
	upsertUser("Hello, world!");
	upsertUser("123456789", "Lily!", "lilyProfile.png", true);
	getUsers();
}

async function upsertUser(phoneNumber: string, name?: string, profilePic?: string, pinned?: boolean) {
	const user = await prisma.user.upsert({
		where: {
			phoneNumber: phoneNumber,
		},
		update: {
			name: name,
			profilePic: profilePic,
			phoneNumber: phoneNumber,
			pinned: pinned,
		},
		create: {
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
