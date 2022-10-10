import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://sonicj.pages.dev',
  base: '/03 Genshin-Redeem-Code-UI',
  integrations: [sitemap(), tailwind()],
  output: 'static',
  server: { port: 3000, host: true}
});