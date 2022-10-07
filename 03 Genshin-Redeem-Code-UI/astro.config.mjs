import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://sonicjhon1.github.io',
  base: '/03 Genshin-Redeem-Code-UI',
  integrations: [sitemap(), tailwind()],
  output: 'static',
  server: { port: 3000, host: true}
});