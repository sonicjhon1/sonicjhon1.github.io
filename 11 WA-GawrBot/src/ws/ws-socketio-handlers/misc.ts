import type { Server, Socket } from "socket.io";

export default function handleWebSocket(server: Server) {
	let listening = false;

	const set = async (socket: Socket) => {
		console.log(`socket ${socket.id} connected`);
	};

	const listen = () => {
		if (listening) return;

		server.on("connection", (socket) => set(socket));
		listening = true;
	};

	const unlisten = () => {
		if (!listening) return;

		server.off("connection", set);
		listening = false;
	};

	return { listen, unlisten };
}
