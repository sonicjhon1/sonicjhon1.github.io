import type { Server } from "socket.io";
import { setSocketio } from "../shared-clients";
import * as handlers from "./ws-socketio-handlers";

type initSocketioOptions = {
	/** Socket.io instance */
	socketio: Server;
};

/** Initialize shared instances that will be consumed by the Store instance */
export function initSocketio({ socketio }: initSocketioOptions) {
	setSocketio(socketio);
}

export class Socketio {
	private readonly wsMiscHandler;
	private readonly wsServerHandler;

	constructor(io: Server) {
		this.wsMiscHandler = handlers.wsMiscHandler(io);
		this.wsServerHandler = handlers.wsServerHandler(io);
		this.listen();
	}

	/** Start listening to the events */
	public listen() {
		this.wsMiscHandler.listen();
		this.wsServerHandler.listen();
	}

	/** Stop listening to the events */
	public unlisten() {
		this.wsMiscHandler.unlisten();
		this.wsServerHandler.unlisten();
	}
}
