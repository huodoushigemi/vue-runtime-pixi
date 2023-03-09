<template>
  <Sprite ref="character" :image="state" :x="$app.screen.width >> 1" :y="$app.screen.height >> 1" :anchor+="{ x: 0.5, y: 0.5 }" cursor="pointer" @click="next()" />
</template>

<script setup lang="ts">
import { useCycleList } from '@vueuse/core'
import { Sprite } from 'pixi.js'
import { ref, getCurrentInstance, onBeforeUnmount } from 'vue'

const { state, next } = useCycleList(['flowerTop.png', 'eggHead.png'])

const character = ref<Sprite>()

getCurrentInstance().proxy.$app.ticker.add(tick)

onBeforeUnmount(() => {
  getCurrentInstance().proxy.$app.ticker.remove(tick)
})

function tick() {
  character.value.rotation += 0.02
}
</script>
