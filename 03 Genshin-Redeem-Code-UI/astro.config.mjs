import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://sonicj.pages.dev/",
	base: "03 Genshin-Redeem-Code-UI",
	build: {
		// Generate `page.html` instead of `page/index.html` during build.
		format: "file",
	},
	integrations: [sitemap(), tailwind()],
	output: "static",
	server: {
		port: 3001,
		host: true,
	},
});
