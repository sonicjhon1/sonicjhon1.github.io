import type { Server, Socket } from "socket.io";

export default function wsServerHandler(io: Server) {
	let listening = false;

	const ping = async (data: any, socket: Socket) => {
		console.log(data);
		socket.emit("ping", "pong");
	};

	const listen = () => {
		if (listening) return;

		io.on("connection", (socket) => {
			socket.on("ping", ping);
		});
		listening = true;
	};

	const unlisten = () => {
		if (!listening) return;

		io.off("connection", (socket) => {
			socket.off("ping", ping);
		});
		listening = false;
	};

	return { listen, unlisten };
}
