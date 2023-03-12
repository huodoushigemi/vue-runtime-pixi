<template>
  <Sprite :ref="bunny1" image="bunny.png" />
  <Sprite :ref="bunny2" image="bunny.png" :y="100" />
  <Sprite :ref="bunny3" image="bunny.png" :y="200" />
  <Sprite :ref="bunny4" image="bunny.png" :x="100" :y="350" :anchor+="{ x: 0.5, y: 0.5 }" />
  <Sprite :ref="bunny5" image="bunny.png" :key="count" :x="50" :y="450" :tint="+`0x${((Math.random() * 16777215) >> 0).toString(16)}`" />
</template>

<script setup lang="ts">
import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import { ref, onBeforeUnmount } from 'vue'

const gsapMap = new Map<Sprite, gsap.core.Tween>()

const duration = 2

function bunny1(el: Sprite) {
  if (gsapMap.has(el)) return
  const tween = gsap.to(el, { x: 500, duration, repeat: -1, yoyo: true })
  gsapMap.set(el, tween)
}

function bunny2(el: Sprite) {
  if (gsapMap.has(el)) return
  const tween = gsap.to(el, { alpha: 0.0, duration, repeat: -1, yoyo: true })
  gsapMap.set(el, tween)
}

function bunny3(el: Sprite) {
  if (gsapMap.has(el)) return
  const tween = gsap.to(el.scale, { x: 2.0, y: 2.0, duration, repeat: -1, yoyo: true })
  gsapMap.set(el, tween)
}

function bunny4(el: Sprite) {
  if (gsapMap.has(el)) return
  const tween = gsap.to(el, { rotation: 2 * Math.PI, duration, repeat: -1, yoyo: true })
  gsapMap.set(el, tween)
}

const count = ref(0)

function bunny5(el: Sprite) {
  if (gsapMap.has(el)) return
  const tween = gsap.to(el, { x: 500, duration, onComplete: () => count.value++ })
  gsapMap.set(el, tween)
}

onBeforeUnmount(() => {
  gsapMap.forEach(e => e.kill())
})
</script>
