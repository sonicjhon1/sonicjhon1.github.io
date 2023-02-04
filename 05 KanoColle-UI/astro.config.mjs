import { defineConfig } from "astro/config";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
	site: "https://sonicj.pages.dev/",
	base: "05 KanoColle-UI",
	build: {
		// Generate `page.html` instead of `page/index.html` during build.
		format: "file",
	},
	integrations: [compress()],
	output: "static",
	server: {
		port: 3003,
		host: true,
	},
});
