import { Socket, io } from "socket.io-client";

// const socket = io("http://localhost:52001");
let socketio: Socket | null = null;

export function setSocketio(socket: Socket) {
	socketio = socket;
}

export function useSocketio(): Socket {
	if (!socketio) {
		console.error("Socket.io cannot be used before initialization. Initializing a new Socket.io server.");
		socketio = io(import.meta.env.PUBLIC_SOCKET_SERVER_URL || "http://localhost:3000");
		console.log(`Socket.io initializated on ${import.meta.env.PUBLIC_SOCKET_SERVER_URL || "http://localhost:3000"}`);
	}
	return socketio;
}
