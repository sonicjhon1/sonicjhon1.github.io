import { initWebSocket } from "../../src/ws/ws-index";
import { Client, LocalAuth } from "whatsapp-web.js";
import { dataStore } from "./store/dataStore";
import { setWA } from "../shared-clients";

export async function init(sessionId: string) {
	const wa = new Client({
		authStrategy: new LocalAuth({
			clientId: sessionId,
		}),
		puppeteer: {
			args: [
				"--no-sandbox",
				"--no-first-run",
				"--disable-setuid-sandbox",
				"--disable-infobars",
				"--disable-dev-shm-usage",
				"--disable-background-timer-throttling",
				"--disable-backgrounding-occluded-windows",
				"--disable-breakpad",
				"--disable-component-extensions-with-background-pages",
				"--disable-features=TranslateUI,BlinkGenPropertyTrees,IsolateOrigins,site-per-process",
				"--disable-ipc-flooding-protection",
				"--disable-renderer-backgrounding",
				"--disable-notifications",
				"--disable-extensions",
				"--ignore-certificate-errors",
				"--ignore-certificate-errors-skip-list",
				"--enable-features=NetworkService,NetworkServiceInProcess",
				"--hide-scrollbars",
				"--force-color-profile=srgb",
				"--mute-audio",
			],
			headless: false,
		},
	});

	setWA(wa, sessionId);
	initWebSocket();

	const store = new dataStore(wa, sessionId);
	process.on("SIGINT", async () => await store.shutdown(wa));
	await wa.initialize();
}
