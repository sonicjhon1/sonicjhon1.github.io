import { Client } from "whatsapp-web.js";

export function stateEvent(wa: Client, sessionId: string) {
	const qr = async (qr: string) => {
		console.log(`QR recieved: ${qr}`);
	};

	const authSuccess = async (_: any) => {
		console.log("Authentication success.");
	};

	const authFail = async (_: any) => {
		console.log("Authentication fail.");
	};

	const loadingScreen = async (percent: string, message: string) => {
		console.log(`Loading: ${percent}%, Message: ${message}`);
	}

	const ready = async () => {
		console.log("Client is ready.");
	};

	const listen = () => {
		wa.on("qr", qr);
		wa.on("authenticated", authSuccess);
		wa.on("auth_failure", authFail);
		wa.on("loading_screen", loadingScreen);
		wa.on("ready", ready);
	};

	const unlisten = () => {
		wa.off("qr", qr);
		wa.off("authenticated", authSuccess);
		wa.off("auth_failure", authFail);
		wa.off("loading_screen", loadingScreen);
		wa.off("ready", ready);
	};

	return { listen, unlisten };
}
