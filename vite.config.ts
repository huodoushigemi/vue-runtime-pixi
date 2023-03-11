import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { isPIXITag } from './src/index.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement: isPIXITag } }
    })
  ],
  resolve: {
    alias: {
      'vue-runtime-pixi': path.resolve(__dirname, './src/index')
    }
  },
  build: {
    outDir: 'docs'
  }
})
