import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
// import vue from '@vitejs/plugin-vue'
import vue from 'unplugin-vue/rollup'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }

const formats = ['esm', 'cjs']

export default defineConfig({
  input: 'src/index.ts',
  output: formats.map(format => ({
    format,
    file: `./dist/index.${format}.js`
  })),
  external: Object.keys(pkg.devDependencies),
  plugins: [vue(), esbuild()]
})
