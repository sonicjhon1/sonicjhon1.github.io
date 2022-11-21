import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  build: {
    // Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  integrations: [tailwind()],
  output: 'static',
  server: {
    port: 3000,
    host: true
  }
});