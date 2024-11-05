import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },

      '/socket.io': {
        target: 'http://localhost:5001',
        ws: true,
        changeOrigin: true,
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  plugins: [react()],
  build: {
    target: 'esnext',
  },
});
