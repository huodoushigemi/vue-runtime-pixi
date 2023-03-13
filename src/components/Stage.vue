<template>
  <canvas ref="canvas" />
</template>

<script setup lang="ts">
import { Application, IApplicationOptions } from 'pixi.js'
import { App, Fragment, h, onBeforeUnmount, onBeforeUpdate, onMounted, Plugin, ref, useSlots, watch } from 'vue'
import { createApp, render } from 'vue-runtime-pixi'

const props = defineProps<{
  uses?: Plugin | Plugin[]
  options?: IApplicationOptions
}>()

const emit = defineEmits<{
  (e: 'app', app: Application): void
}>()

const canvas = ref<HTMLCanvasElement>()

const slots = useSlots()

let app: Application<HTMLCanvasElement>
let vueapp: App

onMounted(() => {
  app = new Application({ ...props.options, view: canvas.value })

  const Root = { render: () => slots.default?.() }
  vueapp = createApp(Root, { app })

  const install = () => castArray(props.uses).forEach(e => vueapp.use(e))
  watch(() => props.uses, install)
  install()

  vueapp.mount(app.stage)

  emit('app', app)
})

onBeforeUnmount(() => {
  app.destroy()
  vueapp.unmount()
})

onBeforeUpdate(() => {
  const children = slots.default?.()
  render(h(Fragment, children), app.stage)
})

function castArray<T>(arr: T[] | T) {
  return Array.isArray(arr) ? arr : arr ? [arr] : []
}
</script>
