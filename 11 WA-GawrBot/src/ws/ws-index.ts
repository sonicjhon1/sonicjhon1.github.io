import { socketio } from "../clients";
import { useSocketio } from "../shared-clients";
import { initSocketio, Socketio } from "./ws-socketio";


export async function initWebSocket() {
	initSocketio({ socketio: socketio });
}

export function startWebSocketHandler() {
	const socket = new Socketio(useSocketio());
}