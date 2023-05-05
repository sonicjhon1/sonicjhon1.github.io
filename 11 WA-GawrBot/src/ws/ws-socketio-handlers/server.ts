import type { Server } from "socket.io";

export default function wsServerHandler(io: Server) {
	let listening = false;

	const ping = async (...args: any[]) => {
		console.log("Event: Ping. Args:", args);
		io.emit("pong");
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
