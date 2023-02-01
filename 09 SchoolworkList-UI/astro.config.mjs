import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

export default defineConfig({
  site: 'https://sonicj.pages.dev',
  base: '/09 SchoolworkList-UI',
  build: {
    // Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  integrations: [tailwind(), compress({html: false})],
  output: 'static',
  server: {
    port: 3000,
    host: true
  }
});