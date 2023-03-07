import { Application } from 'pixi.js'
import { createApp } from 'vue'
import { createApp as createPIXI } from 'vue-runtime-pixi'
import App from './App.vue'

import Animation1 from './Animation1.vue'

const app = createApp(App)
app.mount('#app')

const { stage, view } = new Application()
createPIXI(Animation1).mount(stage)

document.querySelector('#app')?.appendChild(view)
