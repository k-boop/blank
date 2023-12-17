import path from 'path';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import viteHtmlResolveAlias from './dev-utils/vite-plugin-html-resolve-alias';

export default defineConfig ({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    cssCodeSplit: false,
    rollupOptions: {
      external: ['jquery'],
      output: {
        format: 'iife',
        globals: {
          jquery: '$'
        }
      }
    }
  },
  resolve: {
    alias: {
        '../assets/images': path.resolve(__dirname, 'src/assets/images/')
    }
},
  server: {
    port: 8080
  },
  plugins: [
    viteHtmlResolveAlias(),
    viteImagemin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
      customDomId: 'sprite',
    })
  ]
});