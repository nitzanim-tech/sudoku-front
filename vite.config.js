import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/student": {
        target: "https://suduku-back.up.railway.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/student/, ""),
      },
    },
  },
});
