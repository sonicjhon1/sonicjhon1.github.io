import { defineConfig } from 'vite';

export default defineConfig({
  root: '../dist',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true
  },
});
