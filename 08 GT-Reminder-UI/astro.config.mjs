import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://sonicj.pages.dev',
    build: {
        // Generate `page.html` instead of `page/index.html` during build.
        format: 'file'
    },
    integrations: [],
    output: 'static',
    server: {
        port: 3000,
        host: true
    }
});