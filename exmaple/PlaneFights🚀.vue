<template>
  <Graphics :hitArea="$app.screen" @mousemove="onMove">
    <!-- 顶部 -->
    <Graphics :zIndex="1">
      <Graphics :beginFill="[0x2d333b]" :drawRect="[0, 0, width, 55]" endFill :alpha="0.75" />
      <Text text="🛸 PlaneFight" :x="12" :style+="{ fill: 0xffffff, lineHeight: 55 }" />
    </Graphics>

    <!-- 飞机 -->
    <Text ref="plane" text="🛸" :style="{ fontSize: 64 }" :x="width >> 1" :y="height * 0.75" :anchor+="{ x: 0.5, y: 0.5 }" />

    <!-- 子弹容器 -->
    <Container ref="container" />
  </Graphics>
</template>

<script setup lang="ts">
import { getCurrentInstance, shallowRef, onBeforeUnmount, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { Container, FederatedPointerEvent, Sprite, Text } from 'pixi.js'
import { gsap } from 'gsap'

const ins = getCurrentInstance().proxy

const { width, height } = ins.$app.screen

// 飞机
const plane = shallowRef<Container>()

// 鼠标移动
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
</script>
