import { useSocketio } from "../shared-clients";

const socket = useSocketio();

export function attachMessageLogic() {
	const messagesComponent = document.getElementById("messages");
	const messagesChildren = messagesComponent?.children;
	scrollToBottom();

	let promises: Promise<void>[] = [];
	Array.from(messagesChildren || []).forEach(async (messageElement) => {
		promises.push(fetchMedia(messageElement, true));
		// TODO: Would be nice to make this configurable, especially for lower hardware.
		promises.push(new Promise(r => setTimeout(r, 100)))
		messageElement.addEventListener("click", async () => {
			await fetchMedia(messageElement);
		});
	});
	Promise.all(promises).then(scrollToBottom);
}
attachMessageLogic();

export function scrollToBottom() {
	const messagesComponent = document.getElementById("messages");
	if (messagesComponent) {
		messagesComponent.scrollTop = messagesComponent.scrollHeight;
	}
}

async function fetchMedia(messageElement: Element, firstLoad: boolean = false) {
	if (messageElement.getAttribute("has-media") === "true" && messageElement.getAttribute("resolved") !== "true") {
		const response = await socket.emitWithAck("fetchMedia", messageElement.id.substring(16));

		const jsonData = JSON.parse(response);
		const media: string | undefined = decodeURIComponent(jsonData.messageBody);
		const mediaType: string | undefined = jsonData.messageType;
		const mediaElement = messageElement.querySelector("#media");
		if (!mediaElement) return console.error(`${mediaElement} is undefined.`);
		if (!media) {
			const errorElement = document.createElement("p");
			errorElement.innerText = "[Failed to fetch: media is undefined]";
			mediaElement.replaceChildren(errorElement);
			return;
		}

		switch (mediaType) {
			case "sticker":
				const stickerElement = document.createElement("img");
				stickerElement.src = media;
				stickerElement.classList.add("max-h-[10rem]");
				stickerElement.classList.add("py-2");
				mediaElement.replaceChildren(stickerElement);
				messageElement.setAttribute("resolved", "true");
				break;
			case "image":
				const imageElement = document.createElement("img");
				imageElement.src = media;
				imageElement.classList.add("max-h-[20rem]");
				imageElement.classList.add("py-2");
				mediaElement.replaceChildren(imageElement);
				messageElement.setAttribute("resolved", "true");
				break;
			case "ptt":
				const audioElement = document.createElement("audio");
				audioElement.src = media;
				audioElement.classList.add("max-h-[20rem]");
				audioElement.classList.add("py-2");
				audioElement.setAttribute("controls", "");
				mediaElement.replaceChildren(audioElement);
				messageElement.setAttribute("resolved", "true");
				break;
			case "video":
				if (firstLoad) break;
				const videoElement = document.createElement("video");
				videoElement.src = media;
				videoElement.classList.add("max-h-[20rem]");
				videoElement.classList.add("py-2");
				videoElement.setAttribute("controls", "");
				mediaElement.replaceChildren(videoElement);
				messageElement.setAttribute("resolved", "true");
				break;
			default:
				if (firstLoad) return;
				mediaElement.innerHTML = media;
		}
	}
}
