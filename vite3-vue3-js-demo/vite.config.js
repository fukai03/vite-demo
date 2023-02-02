import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  server: {
    https: false,
    port: 3000,
    host: '0.0.0.0',
    open: true,
    cors: true,
    proxy: {}
  },
  build: {
    target: 'es2015',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    reportCompressedSize: false
  }
})
