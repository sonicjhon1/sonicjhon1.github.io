import { socketio } from "../clients";
import { initSocketio } from "./ws-socketio";

export async function initWebSocket() {
	initSocketio({ socketio: socketio });
}
