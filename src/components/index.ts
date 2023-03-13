import { Plugin } from 'vue'
import AssetsLoad from './AssetsLoad'
export { default as AssetsLoad } from './AssetsLoad'
import Stage from './Stage.vue'
export { default as Stage } from './Stage.vue'

export const components = [AssetsLoad, Stage]

export default {
  install(app) {
    components.forEach(e => app.component(e.name ?? e.__name, e))
  }
} as Plugin
