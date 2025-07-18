import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  server: {
    port: 3000,
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  base: '/',
}); 