import { createApp, h } from 'vue'
import { createApp as createPIXI } from 'vue-runtime-pixi'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppPIXI from './AppPIXI.vue'

createApp(App).mount('#app')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/Animation1' },
    { path: '/Animation1', component: () => import('./Animation1.vue') },
    { path: '/Animation2', component: () => import('./Animation2.vue') },
    { path: '/Animation3', component: () => import('./Animation3.vue') },
    { path: '/Animation4', component: () => import('./Animation4.vue') },
    { path: '/Snake 🐍', component: () => import('./Snake🐍.vue') },
    { path: '/Snake🐍', redirect: '/Snake 🐍' },
    { path: encodeURI('/Snake 🐍'), redirect: '/Snake 🐍' },
    { path: '/PlaneFights 🚀', component: () => import('./PlaneFights🚀.vue') },
    { path: '/PlaneFights🚀', redirect: '/PlaneFights 🐍' },
    { path: encodeURI('/PlaneFights 🚀'), redirect: '/PlaneFights 🐍' }
  ]
})

createPIXI(AppPIXI).use(router).mount('#app')
