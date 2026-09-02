import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'ES2020',
    minify: false,
    lib: {
      entry: './index.ts',
      name: 'AdaptiveWebController',
      fileName: () => `adaptive-web-controller.js`,
      formats: ['iife'],
    },
    outDir: './dist',
    emptyOutDir: false,
    commonjsOptions: {
      include: /node_modules/
    }
  }
})
