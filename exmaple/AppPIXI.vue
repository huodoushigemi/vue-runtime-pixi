<template>
  <!-- tabs -->
  <AssetsLoad :urls="['/button.png', '/button_hover.png', '/button_pressed.png', '/button_disabled.png']">
    <Class :is="scrollbox">
      <Container v-for="path in routes">
        <Class :is="FancyButton" :ref="cb" v-bind="btnprops" :defaultView="Sprite.from('/button.png')" :hoverView="Sprite.from('/button_hover.png')" :pressedView="Sprite.from('/button_pressed.png')" :text="path" @click="onClick(path)" />
      </Container>
    </Class>
  </AssetsLoad>

  <!-- main -->
  <Container :y="80" :width="$app.screen.width" :getChildAt="[0]">
    <router-view />
  </Container>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { ScrollBox, FancyButton, ButtonOptions } from '@pixi/ui'
import { Container, Sprite } from 'pixi.js'

const proxy = getCurrentInstance().proxy

const scrollbox = new ScrollBox({ type: 'horizontal', elementsMargin: 20, width: proxy.$app.screen.width, height: 80, horPadding: 40, vertPadding: 40, background: 0xffffff })
scrollbox.addChild = scrollbox.addItem
scrollbox.removeChild = scrollbox.removeItem

const routes = ['Animation1', 'Animation2', 'Animation3', 'Snake 🐍', 'PlaneFights 🚀']

const animations: ButtonOptions['animations'] = {
  hover: { props: { scale: { x: 1.1, y: 1.1 }, y: -2 }, duration: 100 },
  pressed: { props: { scale: { x: 0.9, y: 0.9 }, y: 4 }, duration: 100 }
}

function cb(el?: FancyButton) {
  if (!el) return
  el.scale.set(0.45, 0.45)
  el.textView.style.fill = 0xffffff
  el.textView.style.fontSize = 42
  el.textView.style.dropShadow = true
  el.textView.style.dropShadowBlur = 8
}

function onClick(path: string) {
  proxy.$router.push(path)
}

const btnprops: Partial<ButtonOptions> = {
  animations,
  anchorX: 0.5,
  anchorY: 0.5,
  textOffset: { y: -10 }
}
</script>
