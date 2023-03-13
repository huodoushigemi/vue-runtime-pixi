<template>
  <p>
    <img src="https://img.shields.io/github/forks/huodoushigemi/vue-runtime-pixi.svg?style=flat-square" />
    <img src="https://img.shields.io/github/stars/huodoushigemi/vue-runtime-pixi.svg?style=flat-square" />
    <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license" />
    <img src="https://img.shields.io/badge/pixi-v7+-ff69b4.svg?style=flat-square" alt="pixi version" />
  </p>
  <p>如你所见，点击按钮切换路由 <a href="https://github.com/huodoushigemi/vue-runtime-pixi/tree/main/exmaple" target="_blank">[Source map]</a></p>

  <Stage :options="{ background: 0x888888 }" :uses="router">
    <AppPIXI />
  </Stage>
</template>

<script setup lang="ts">
import { Stage } from 'vue-runtime-pixi'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppPIXI from './AppPIXI.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/Animation1' },
    { path: '/Animation1', component: () => import('./Animation1.vue') },
    { path: '/Animation2', component: () => import('./Animation2.vue') },
    { path: '/Animation3', component: () => import('./Animation3.vue') },
    { path: '/Animation4', component: () => import('./Animation4.vue') },
    { path: '/Snake 🐍', component: () => import('./Snake🐍.vue') },
    { path: encodeURI('/Snake 🐍'), redirect: '/Snake 🐍' },
    { path: '/PlaneFights 🚀', component: () => import('./PlaneFights🚀.vue') },
    { path: encodeURI('/PlaneFights 🚀'), redirect: '/PlaneFights 🚀' }
  ]
})
</script>

<style scoped>
img + img {
  margin-left: 8px;
}
</style>
