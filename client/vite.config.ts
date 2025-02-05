import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import analyze from 'rollup-plugin-analyzer';
// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      plugins: [analyze()],
    },
  },
  plugins: [react()],

  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
