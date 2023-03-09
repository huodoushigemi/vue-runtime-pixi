<template>
  <!-- tabs -->
  <AssetsLoad :urls="['/button.png', '/button_hover.png', '/button_pressed.png', '/button_disabled.png']">
    <Class :is="scrollbox" type="horizontal">
      <Container v-for="path in routes" :y="40">
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
import { getCurrentInstance } from 'vue'
import { ScrollBox, FancyButton, ButtonOptions, RadioBoxOptions } from '@pixi/ui'
import { Container, Sprite } from 'pixi.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const proxy = getCurrentInstance().proxy

const scrollbox = new ScrollBox({ type: 'horizontal', elementsMargin: 20, width: proxy.$app.screen.width, height: 80, horPadding: 40, background: 0xffffff })
scrollbox.addChild = scrollbox.addItem
scrollbox.removeChild = scrollbox.removeItem

type Extract<T extends Record<string, any>, E> = { [K in keyof T]: T[K] extends E ? K : never }[keyof T]

const routes = ['animation1', 'animation2', 'animation3', 'snake 🐍', 'plane-fights 🚀', 'xxx']

const aaa = { color: 0xf1d583, width: 25, height: 25, radius: 10, padding: 4 }
const bbb = { color: 0xf1d583, width: 25, height: 25, radius: 10, padding: 4, fillColor: 0x82c822 }

const asd: RadioBoxOptions = {
  selectedItem: 0,
  items: routes,
  type: 'vertical',
  elementsMargin: 10,
  style: { bg: aaa, checked: bbb, textStyle: { fill: 0xffffff, fontSize: 32 } }
}

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
