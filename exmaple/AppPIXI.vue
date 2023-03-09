<template>
  <!-- tabs -->
  <!-- <Class v-for="item in btns" :is="item" /> -->
  <AssetsLoad :urls="['/button.png', '/button_hover.png', '/button_pressed.png', '/button_disabled.png']">
    <Class :is="Layout" type="horizontal" :elementsMargin="20" :x="60" :y="40">
      <Container v-for="path in routes">
        <Class :is="FancyButton" :ref="cb" v-bind="btnprops" :defaultView="Sprite.from('/button.png')" :hoverView="Sprite.from('/button_hover.png')" :pressedView="Sprite.from('/button_pressed.png')" :text="path" @click="onClick(path)" />
      </Container>
    </Class>
  </AssetsLoad>

  <!-- main -->
  <Container :y="80" :width="$app.screen.width">
    <router-view />
  </Container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Layout, FancyButton, ButtonOptions, RadioBoxOptions } from '@pixi/ui'
import { Container, Graphics, Sprite, Text } from 'pixi.js'
import { useRouter } from 'vue-router'

const router = useRouter()

type Extract<T extends Record<string, any>, E> = { [K in keyof T]: T[K] extends E ? K : never }[keyof T]

const routes = ['animation1', 'animation2', 'animation3', 'snake 🐍', 'plane-fights 🚀']

const aaa = { color: 0xf1d583, width: 25, height: 25, radius: 10, padding: 4 }
const bbb = { color: 0xf1d583, width: 25, height: 25, radius: 10, padding: 4, fillColor: 0x82c822 }

const asd: RadioBoxOptions = {
  selectedItem: 0,
  items: routes,
  type: 'vertical',
  elementsMargin: 10,
  style: { bg: aaa, checked: bbb, textStyle: { fill: 0xffffff, fontSize: 32 } }
}

const defaultView = new Graphics().beginFill(0xcccccc).drawRoundedRect(0, 0, 100, 40, 10).endFill()
const text = new Text('route', { fill: '#ffffff' })

const animations: ButtonOptions['animations'] = {
  hover: { props: { scale: { x: 1.1, y: 1.1 }, y: -2 }, duration: 100 },
  pressed: { props: { scale: { x: 0.9, y: 0.9 }, y: 4 }, duration: 100 }
}

function cb(el?: FancyButton) {
  if (!el) return
  el.anchor.set(0.5, 0.5)
  el.scale.set(0.45, 0.45)
  el.textView.style.fill = 0xffffff
  el.textView.style.fontSize = 42
  el.textView.style.dropShadow = true
  el.textView.style.dropShadowBlur = 8
}

function onClick(path: string) {
  router.push(path)
}

const btnprops: Partial<ButtonOptions> = {
  animations,
  anchorX: 0.5,
  anchorY: 0.5,
  textOffset: { y: -10 }
}
</script>
