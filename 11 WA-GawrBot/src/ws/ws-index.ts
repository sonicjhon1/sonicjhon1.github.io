import { useSocketio } from "../shared-clients";
import { Socketio } from "./ws-socketio";

export async function initWebSocket() {
	new Socketio(useSocketio());
}
