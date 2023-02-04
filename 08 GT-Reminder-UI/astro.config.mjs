import { defineConfig } from "astro/config";
import compress from "astro-compress";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://sonicj.pages.dev/",
	base: "08 GT-Reminder-UI",
	build: {
		// Generate `page.html` instead of `page/index.html` during build.
		format: "file",
	},
	integrations: [tailwind(), compress()],
	output: "static",
	server: {
		port: 3004,
		host: true,
	},
});
