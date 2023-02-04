import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://sonicj.pages.dev/",
	base: "04 NachoNekoNyaanime-UI",
	build: {
		// Generate `page.html` instead of `page/index.html` during build.
		format: "file",
	},
	integrations: [tailwind()],
	output: "static",
	server: {
		port: 3002,
		host: true,
	},
});
