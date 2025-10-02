import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // dùng relative path để chạy trong Capacitor (android asset)
  server: { port: 5173, host: true }
})
