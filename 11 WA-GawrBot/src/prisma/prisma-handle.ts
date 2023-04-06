import prisma from "./prisma-client";

export async function prismaHandler() {
	upsertUser("Hello, world!");
	upsertUser("123456789", "Lily!", "lilyProfile.png", true);
	getUsers();
}

export async function upsertUser(phoneNumber: string, name?: string, profilePic?: string, pinned?: boolean) {
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

export async function upsertMessage(messageId: string, messageType: string, messageStatus: string, phoneNumber: string, messageTime: Date, messageText?: string) {
	const message = await prisma.message.upsert({
		where: {
			id: messageId,
		},
		update: {
			id: messageId,
			type: messageType,
			text: messageText,
			status: messageStatus,
			user: {
				connect: { phoneNumber: phoneNumber}
			},
			messageTime: messageTime
		},
		create: {
			id: messageId,
			type: messageType,
			text: messageText,
			status: messageStatus,
			user: {
				connect: { phoneNumber: phoneNumber}
			},
			messageTime: messageTime
		},
	});
	console.log(message);
}