import { init, createSession } from "./src/wa/wa-index";
import { prisma } from "./src/clients";
import { initWebSocket } from "./src/ws/ws-index";
import { handleWebSocket } from "./src/ws/ws-handle";

init().then(async () => {
	let sessionId = "owo";
	if (!(await prisma.session.findFirst({ where: { sessionId } }))) {
		await createSession({ sessionId });
	}
});
initWebSocket().then(async () => {
	handleWebSocket();
});
