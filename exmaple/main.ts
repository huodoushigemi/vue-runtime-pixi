import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [
//     { path: '/', redirect: '/Animation1' },
//     { path: '/Animation1', component: () => import('./Animation1.vue') },
//     { path: '/Animation2', component: () => import('./Animation2.vue') },
//     { path: '/Animation3', component: () => import('./Animation3.vue') },
//     { path: '/Animation4', component: () => import('./Animation4.vue') },
//     { path: '/Snake ๐', component: () => import('./Snake๐.vue') },
//     { path: encodeURI('/Snake ๐'), redirect: '/Snake ๐' },
//     { path: '/PlaneFights ๐', component: () => import('./PlaneFights๐.vue') },
//     { path: encodeURI('/PlaneFights ๐'), redirect: '/PlaneFights ๐' }
//   ]
// })

createApp(App)
  .use(createRouter({ history: createWebHashHistory(), routes: [] }))
  .mount('#app')
