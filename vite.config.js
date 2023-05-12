import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    port: 3001,
    proxy: {
      "/api": {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
})
