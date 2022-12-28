import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://sonicj.pages.dev',
  build: {
    // Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  integrations: [tailwind(), compress()],
  output: 'static',
  server: {
    port: 3000,
    host: true
  }
});