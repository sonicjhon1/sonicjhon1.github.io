import { init, createSession } from "./src/wa/wa-index";
import { prisma } from "./src/clients";

init().then(async () => {
	let sessionId = "owo";
	if (!(await prisma.session.findFirst({ where: { sessionId } }))) {
		await createSession({ sessionId });
	}
});