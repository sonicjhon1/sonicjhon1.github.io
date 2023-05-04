import type { Server, Socket } from "socket.io";

export default function handleWebSocket(io: Server) {
	let listening = false;

	const set = async (socket: Socket) => {
		console.log(`socket ${socket.id} connected`);
	};

	const listen = () => {
		if (listening) return;

		io.on("connection", set);
		listening = true;
	};

	const unlisten = () => {
		if (!listening) return;

		io.off("connection", set);
		listening = false;
	};

	return { listen, unlisten };
}
