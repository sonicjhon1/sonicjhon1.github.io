import type { Server } from "socket.io";
import { setSocketio } from "../shared-clients"

type initSocketioOptions = {
	/** Socket.io instance */
	socketio: Server;
};

/** Initialize shared instances that will be consumed by the Store instance */
export function initSocketio({ socketio }: initSocketioOptions) {
	setSocketio(socketio);
}