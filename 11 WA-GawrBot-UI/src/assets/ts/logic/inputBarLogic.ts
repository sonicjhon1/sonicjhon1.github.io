import { useSocketio } from "../shared-clients";

const socket = useSocketio();

export function attachInputBarLogic() {
	const iconSendComponent = document.getElementById("icon-send");

	iconSendComponent?.addEventListener("click", sendMessage);
}
attachInputBarLogic();

export async function sendMessage() {
	const textInput = document.getElementById("input-text") as HTMLInputElement;
	const mainComponent = document.getElementById("main") as HTMLDivElement;
	let chatPhone = mainComponent.dataset.chatPhone;
	if (textInput?.value.indexOf("@everyone") > -1) {
		try {
			await socket.timeout(10000).emitWithAck("sendMessageMentionAll", chatPhone, textInput.value);
		} catch (e) {
			console.error(e);
		}
	}
    if (textInput?.value) {
		try {
			await socket.timeout(10000).emitWithAck("sendMessage", chatPhone, textInput.value);
		} catch (e) {
			console.error(e);
		}
	}
}
