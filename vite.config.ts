import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { isPIXITag } from './src/index.ts'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement: isPIXITag } }
    }),
    visualizer({ open: true })
  ],
  resolve: {
    alias: {
      'vue-runtime-pixi': path.resolve(__dirname, './src/index')
    }
  },
  base: '/vue-runtime-pixi',
  build: {
    outDir: 'docs'
  }
})
