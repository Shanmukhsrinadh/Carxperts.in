import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Carxperts.in/',
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
