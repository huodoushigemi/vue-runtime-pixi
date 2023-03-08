<template>
  <!-- <Text text="ssss" style="fill: red" :y="100" /> -->
  <!-- tabs -->
  <!-- <Class v-for="route in routes" :is="CheckBox" :ref="checkBox" :text="route" :checked="false" :style="{ unchecked: unchecked(), checked: checked(), text: { fill: 0xffffff } }" /> -->
  <!-- <Class :is="CheckBox" text="XXXXX" :style="{ unchecked: defaultView, checked: defaultView, text: { fill: 0xffffff } }" /> -->
  <Graphics :x="123" :y="0" :beginFill="[]" />
  <Sprite :x="1" :texture="undefined" />
  <Class :is="radio.innerView" />
  <Class :is="Layout" />
  <!-- <Class :is="Layout" type="horizontal" :elementsMargin="10"> -->
  <!-- </Class> -->
  <!-- <Text text="123" />
  <Text text="123" />
  <Text text="123" /> -->

  <!-- main -->
  <Container y="60">
    <router-view />
  </Container>
</template>

<script setup lang="ts">
import { Layout, Button, FancyButton, ButtonOptions, CheckBox, RadioGroup, RadioBoxOptions } from '@pixi/ui'
import { Container, Graphics, Text } from 'pixi.js'
import { getStage } from 'vue-runtime-pixi'

type Extract<T extends Record<string, any>, E> = { [K in keyof T]: T[K] extends E ? K : never }[keyof T]

type zxc = Extract<{ x: number; d: string }, string>

const routes = ['animation1', 'animation2', 'animation3', 'animation4', 'animation5']

function checkBox(el: CheckBox) {
  el.onCheck.connect(checked => {
    console.log(checked)
  })
  // el.onChange.connect((checked) => {
  //   console.log(checked)
  // })
}

const aaa = { color: 0xf1d583, width: 25, height: 25, radius: 10, padding: 4 }
const bbb = { color: 0xf1d583, width: 25, height: 25, radius: 10, padding: 4, fillColor: 0x82c822 }

const asd: RadioBoxOptions = {
  selectedItem: 0,
  items: routes,
  type: 'vertical',
  elementsMargin: 10,
  style: { bg: aaa, checked: bbb, textStyle: { fill: 0xffffff, fontSize: 32 } }
}

const radio = new RadioGroup(asd)

const defaultView = new Graphics().beginFill(0xcccccc).drawRoundedRect(0, 0, 100, 40, 10).endFill()
const text = new Text('route', { fill: '#ffffff' })

const animations: ButtonOptions['animations'] = {
  hover: { props: { scale: { x: 1.1, y: 1.1 }, y: -2 }, duration: 100 },
  pressed: { props: { scale: { x: 0.9, y: 0.9 }, y: 4 }, duration: 100 }
}

function cb(el: FancyButton) {
  el.anchor.set(0.5, 0.5)
}
</script>
