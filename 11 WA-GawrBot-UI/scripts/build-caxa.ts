import process from 'node:process';
import caxa from "caxa";

let fileExtension = "";
if (process.platform === "win32") {
	fileExtension = "-x86_64-pc-windows-msvc.exe";
}

async function createServerPackage() {
	await caxa({
		input: "./",
		output: `src-tauri/binaries/app/caxaDist${fileExtension}`,
		dedupe: false,
		exclude: ["*", ".*", "!dist", "!node_modules"],
		command: ["{{caxa}}/node_modules/.bin/node", "{{caxa}}/dist/server/entry.mjs"],
	});
}

(async () => {
	try {
		console.log("Building Caxa...");
		await createServerPackage();
		console.log("Done.");
	} catch (e) {
		console.log(e);
		throw e;
	}
})();
