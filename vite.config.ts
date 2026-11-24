import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { watchCv } from './scripts/watch-cv.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-cv',
      configureServer(server) {
        server.httpServer?.once('close', watchCv())
      },
    },
  ],
  build: { rolldownOptions: { input: ['index.html', 'cv/index.html'] } },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
