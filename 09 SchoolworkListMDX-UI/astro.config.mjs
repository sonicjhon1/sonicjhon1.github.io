import { defineConfig } from 'astro/config';

// https://astro.build/config
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

export default defineConfig({
  site: 'https://sonicj.pages.dev',
  base: '/09 SchoolworkListMDX-UI',
  build: {
    // Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  integrations: [mdx(), compress()],
  output: 'static',
  server: {
    port: 3000,
    host: true
  }
});