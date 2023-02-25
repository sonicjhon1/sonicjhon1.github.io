import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://sonicj.pages.dev/",
  build: {
    // Generate `page.html` instead of `page/index.html` during build.
    format: "file"
  },
  integrations: [mdx(), tailwind(), compress()],
  output: "static",
  server: {
    port: 3006,
    host: true
  }
});