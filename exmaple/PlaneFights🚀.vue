<template>
  <Graphics :hitArea="$app.screen" @mousemove="onMove">
    <!-- 顶部 -->
    <Graphics :zIndex="1">
      <Graphics :beginFill="[0x2d333b]" :drawRect="[0, 0, width, 55]" endFill :alpha="0.75" />
      <Text text="🛸 PlaneFight" :x="12" :style+="{ fill: 0xffffff, lineHeight: 55 }" />
      <Sprite image="https://huodoushigemi.github.io/docx2vue/assets/github-540f5a2f.svg" :x="168" :y="5" :width="45" :height="45" cursor="pointer" @click="toGithub" />
    </Graphics>

    <!-- 飞机 -->
    <Text ref="plane" text="🛸" :style="{ fontSize: 64 }" :x="width >> 1" :y="height * 0.75" :anchor+="{ x: 0.5, y: 0.5 }" />

    <!-- 子弹 -->
    <!-- <template v-for="e in bullets">
      <Class :is="e" />
    </template> -->
    <Container ref="container" />
  </Graphics>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, shallowRef, onBeforeUnmount, onMounted, ref } from 'vue'
import { useEventListener, useIntervalFn, onKeyStroke } from '@vueuse/core'
import { Container, DisplayObjectEvents, FederatedPointerEvent, Sprite, Text, Texture } from 'pixi.js'
import { gsap } from 'gsap'
import { remove } from '@vue/shared'

const ins = getCurrentInstance().proxy

const { width, height } = ins.$app.screen

// 飞机
const plane = shallowRef<Container>()

function onMove(e: FederatedPointerEvent) {
  plane.value.parent.toLocal(e.global, null, plane.value.position)
}

// 子弹容器
const container = ref<Container>()
const tweens = [] as gsap.core.Tween[]

// 发射子弹
const { pause } = useIntervalFn(() => {
  const e = new Text('🔥')
  e.x = plane.value.x
  e.y = plane.value.y - 40
  e.anchor.set(0.5, 0.5)
  container.value.addChild(e)

  const tween = gsap.to(e, { y: 0, duration: 1, ease: 'none', onComplete: () => container.value.removeChild(e) })
  tweens.push(tween)
}, 300)

onBeforeUnmount(() => {
  tweens.forEach(e => e.kill())
  pause()
})

function toGithub() {
  const a = document.createElement('a')
  a.href = 'https://github.com/huodoushigemi/vue-canvas-snake.git'
  a.target = '_blank'
  a.click()
}
</script>
