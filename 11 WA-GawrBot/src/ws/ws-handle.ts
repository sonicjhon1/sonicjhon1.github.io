import { useSocketio } from "../shared-clients";

export async function handleWebSocket() {
	const io = useSocketio();
	io.on("connection", (socket) => {
		console.log(`socket ${socket.id} connected`);
	});
}
