import { useSocketio } from "../shared-clients";

const socket = useSocketio();

export function attachChatLogic() {
	const divChat = document.querySelectorAll<HTMLDivElement>("#chat");
	for (let i = 0; i < divChat.length; i++) {
		divChat[i].parentNode?.addEventListener("click", () => {
			socket.emit("fetchMain", (divChat[i].parentNode as HTMLDivElement).id.substring(5))
		});
	}
}
attachChatLogic();

export function toggleChatsComponentMobile() {
	const chatsComponentMobile = document.getElementById("chats");
	chatsComponentMobile?.classList.toggle("hidden");
}

export function hideChatsComponentMobile() {
	const chatsComponentMobile = document.getElementById("chats");
	chatsComponentMobile?.classList.add("hidden");
}