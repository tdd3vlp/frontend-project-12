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
        api: 'modern-compiler',
        quietDeps: true,
      },
    },
  },
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('socket.io')) return 'socketio';
          if (id.includes('rollbar') || id.includes('@rollbar')) return 'monitoring';
          if (id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
          if (id.includes('react/') || id.includes('react-redux') || id.includes('@reduxjs')) return 'redux-vendor';
          if (id.includes('bootstrap') || id.includes('react-bootstrap')) return 'ui-vendor';
          return 'vendor';
        },
      },
    },
  },
});
