import type { Server, Socket } from "socket.io";

export default function handleWebSocket(io: Server) {
	let listening = false;

	const connection = async (socket: Socket) => {
		console.info(`socket ${socket.id} connected.`);
		socket.on("disconnect", (reason) => {
			console.info(`socket ${socket.id} disconnected because of ${reason}.`);
		});
	};

	const listen = () => {
		if (listening) return;

		io.on("connection", connection);
		listening = true;
	};

	const unlisten = () => {
		if (!listening) return;

		io.off("connection", connection);
		listening = false;
	};

	return { listen, unlisten };
}