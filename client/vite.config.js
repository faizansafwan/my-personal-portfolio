import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js|tsx|ts)$/,
    }),
  ],
  base: '/my-personal-portfolio/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Two real HTML pages so GitHub Pages serves /motion/ directly (no client-side router).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        motion: fileURLToPath(new URL('./motion/index.html', import.meta.url)),
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
