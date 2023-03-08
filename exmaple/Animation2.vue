<template>
  <Graphics />
  <Text text="loading" style="fill: white" />
  <my-animation :from="0" :to="300">
    <template #default="{ value }">
      <Text text="xxxx" :x="value" :y="value" style="fill: white" />
    </template>
  </my-animation>
  <router-view />
</template>

<script setup lang="ts">
import { Graphics } from 'pixi.js'
import MyAnimation from './components/MyAnimation.vue'
</script>
