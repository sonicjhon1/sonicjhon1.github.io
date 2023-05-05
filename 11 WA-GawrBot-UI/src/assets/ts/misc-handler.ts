import { useSocketio } from "./shared-clients";

export function MiscHandler() {
	const socket = useSocketio();
	socket.on("pong", () => {
		console.log("Pong received!");
	});
}
