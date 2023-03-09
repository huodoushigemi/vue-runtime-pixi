<template>
  <Sprite image="bg_depth_blur.jpg" :width="$app.screen.width" :height="$app.screen.height" />
  <Sprite image="depth_blur_dudes.jpg" :x="$app.screen.width / 2 - 315" :y="200" :filters="[blurFilter1]" />
  <Sprite image="depth_blur_moby.jpg" :x="$app.screen.width / 2 - 200" :y="100" :filters="[blurFilter2]" />
</template>

<script setup lang="ts">
import { BlurFilter } from 'pixi.js'
import { getCurrentInstance, onBeforeUnmount } from 'vue'

const blurFilter1 = new BlurFilter()
const blurFilter2 = new BlurFilter()

getCurrentInstance().proxy.$app.ticker.add(tick)

onBeforeUnmount(() => {
  getCurrentInstance().proxy.$app.ticker.remove(tick)
})

let count = 0

function tick() {
  count += 0.01
  blurFilter1.blur = 20 * Math.cos(count)
  blurFilter2.blur = 20 * Math.sin(count)
}
</script>
