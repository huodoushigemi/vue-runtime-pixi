import { Plugin } from 'vue'
import AssetsLoad from './AssetsLoad'
export { default as AssetsLoad } from './AssetsLoad'

export const components = [AssetsLoad]

export default {
  install(app) {
    components.forEach((e) => {
      app.component(e.name, e)
    })
  }
} as Plugin
