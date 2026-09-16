import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/freshcart': 'http://localhost:5000',
      '/products': 'http://localhost:5000',
      '/categories': 'http://localhost:5000',
    },
  },
})
