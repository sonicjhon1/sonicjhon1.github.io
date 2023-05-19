import { useSocketio } from "./shared-clients";
import { attachChatLogic } from "./logic/chatLogic";
import { attachChatsLogic } from "./logic/chatsLogic";
import { attachHeaderLogic } from "./logic/headerLogic";
import { attachMessageLogic } from "./logic/messageLogic";
import { showMainComponentMobile, hideMainComponentMobile } from "./logic/mainLogic";
import { attachInputBarLogic } from "./logic/inputBarLogic";

function socketHandler() {
	const socket = useSocketio();

	socket.on("connect", () => {
		console.log(socket.id);
		socket.emit("fetchInit");
	});

	socket.on("reloadChat", (prerender) => {
		let chatsComponent = document.getElementById("chats");
		chatsComponent ? (chatsComponent.outerHTML = prerender) : void 0;
		hideMainComponentMobile();
		attachChatLogic();
		attachChatsLogic();
	});

	socket.on("reloadMain", (prerender) => {
		let mainComponent = document.getElementById("main");
		mainComponent ? (mainComponent.outerHTML = prerender) : void 0;
		showMainComponentMobile();
		attachHeaderLogic();
		attachMessageLogic();
		attachInputBarLogic();
	});
}
socketHandler();
