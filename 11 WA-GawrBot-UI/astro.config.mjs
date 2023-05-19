import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import node from "@astrojs/node";

const SITE = "https://sonicj.pages.dev/";
const BASE = import.meta.env.PROD ? "11 WA-GawrBot-UI" : "/";

export default defineConfig({
	site: SITE,
	base: import.meta.env.PUBLIC_LOCAL_BUILD ? BASE : "/",
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
		inlineStylesheets: "always",
		// scopedStyleStrategy: "class",
	},
	image: {
		service: sharpImageService(),
	},
	output: "server",
	server: {
		port: 3006,
		host: true,
	},
	adapter: node({
		mode: "standalone",
	}),
});
