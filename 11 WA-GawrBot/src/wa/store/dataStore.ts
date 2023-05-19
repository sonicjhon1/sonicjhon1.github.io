import type { Client } from "whatsapp-web.js";
import { useDB } from "../../shared-clients";
import { stateEvent } from "./data/state";
import { messageEvent } from "./data/message";

const db = useDB();

export class dataStore {
	private readonly stateEvent;
	private readonly messageEvent;

	constructor(wa: Client, sessionId: string) {
		(async () => {
			const session = await db.selectFrom("Session").selectAll().where("id", "==", `Session:${sessionId}`).executeTakeFirst();
			if (!session) {
				await db
					.create("Session")
					.set({ id: sessionId })
					.execute()
					.catch((_) => console.error(`Session ${sessionId} already exists, but auth for the session could not be found.`));
			}
		})();

		this.stateEvent = stateEvent(wa, sessionId);
		this.messageEvent = messageEvent(wa, sessionId);
		this.listen();
	}

	public listen() {
		this.stateEvent.listen();
		this.messageEvent.listen();
	}

	public unlisten() {
		this.stateEvent.unlisten();
		this.messageEvent.unlisten();
	}

	public async shutdown(wa: Client) {
		console.log("Gracefully shutdown.");
		await wa.destroy();
		await db.destroy();
		this.unlisten();
		process.exit();
	}
}
