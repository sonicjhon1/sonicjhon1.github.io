import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	site: "https://sonicj.pages.dev/",
	base: "09 SchoolworkList-UI",
	build: {
		// Generate `page.html` instead of `page/index.html` during build.
		format: "file",
	},
	integrations: [
		tailwind(),
		compress({
			html: {
				removeAttributeQuotes: false,
				decodeEntities: true,
			},
		}),
	],
	experimental: {
		assets: true,
		
	},
	output: "static",
	server: {
		port: 3005,
		host: true,
	},
	vite: {
		plugins: [
			basicSsl(),
		],
	}
});
