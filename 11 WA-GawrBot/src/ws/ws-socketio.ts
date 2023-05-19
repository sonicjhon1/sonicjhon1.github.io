import type { Server } from "socket.io";
import { roundTripEvent } from "./handlers/roundtrip";
import { toServerEvent } from "./handlers/toServer";

export class Socketio {
	private readonly roundTripEvent;
	private readonly toServerEvent;

	constructor(io: Server) {
		this.roundTripEvent = roundTripEvent(io);
		this.toServerEvent = toServerEvent(io);
		this.listen();
	}

	/** Start listening to the events */
	public listen() {
		this.roundTripEvent.listen();
		this.toServerEvent.listen();
	}

	/** Stop listening to the events */
	public unlisten() {
		this.roundTripEvent.unlisten();
		this.toServerEvent.unlisten();
	}
}
