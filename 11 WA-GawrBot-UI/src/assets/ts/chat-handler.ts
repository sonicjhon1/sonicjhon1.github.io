import { useSocketio } from "./shared-clients";

export function ChatHandler() {
	const socket = useSocketio();
	socket.on("connect", () => {
		console.log(socket.id);
	});
	console.log("In chat!");
	return "In chat client!";
}
