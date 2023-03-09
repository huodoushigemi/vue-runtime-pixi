import { createApp, h } from 'vue'
import { createApp as createPIXI } from 'vue-runtime-pixi'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppPIXI from './AppPIXI.vue'
import Animation1 from './Animation1.vue'
import Animation2 from './Animation2.vue'
import Animation3 from './Animation3.vue'

const app = createApp(App)
app.mount('#app')

const appPIXI = createPIXI(AppPIXI)

appPIXI.use(
  createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/animation1' },
      { path: '/animation1', component: Animation1 },
      { path: '/animation2', component: Animation2 },
      { path: '/animation3', component: Animation3 }
    ]
  })
)

appPIXI.mount()

document.querySelector('#app')?.appendChild(appPIXI._props.app.view)
