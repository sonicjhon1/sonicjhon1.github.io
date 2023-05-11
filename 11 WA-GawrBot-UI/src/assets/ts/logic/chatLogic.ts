import { toggleMainComponentMobile } from "./mainLogic";

function attachChatLogic() {
	const divChat = document.querySelectorAll<HTMLDivElement>("#chat");
	for (let i = 0; i < divChat.length; i++) {
		divChat[i].addEventListener("click", toggleMainComponentMobile);
	}
}
attachChatLogic();

export function toggleChatsComponentMobile() {
	const chatsComponentMobile = document.getElementById("chats");
	chatsComponentMobile?.classList.toggle("hidden");
}
