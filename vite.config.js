import path from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig ({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      external: ['jquery'],
      output: {
        // format: 'iife',
        globals: {
          jquery: '$'
        }
      }
    }
  },
  server: {
    port: 8080
  },
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
      customDomId: 'sprite',
    })
  ]
});