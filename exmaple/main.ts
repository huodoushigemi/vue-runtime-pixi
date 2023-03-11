import { createApp, h } from 'vue'
import { createApp as createPIXI } from 'vue-runtime-pixi'
import App from './App.vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import AppPIXI from './AppPIXI.vue'

createApp(App).mount('#app')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/Animation1' },
    { path: '/Animation1', component: { render: () => h('Text', { text: 'VueRouter……', style: 'fill: red' }) } },
    { path: '/Animation2', component: () => import('./Animation2.vue') },
    { path: '/Animation3', component: () => import('./Animation3.vue') },
    { path: '/Animation4', component: () => import('./Animation4.vue') },
    { path: '/Snake 🐍', component: () => import('./Snake🐍.vue') },
    { path: encodeURI('/Snake 🐍'), component: () => import('./Snake🐍.vue') },
    { path: '/PlaneFights 🚀', component: () => import('./PlaneFights🚀.vue') },
    { path: encodeURI('/PlaneFights 🚀'), component: () => import('./PlaneFights🚀.vue') }
  ]
})

createPIXI(AppPIXI).use(router).mount('#app')
