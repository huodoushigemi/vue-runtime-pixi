<template>
  <Text text="ssss" style="fill: red" y="100" />
  <!-- tabs -->
  <!-- <Class v-for="route in routes" :is="CheckBox" :ref="checkBox" :text="route" :checked="false" :style="{ unchecked: unchecked(), checked: checked(), text: { fill: 0xffffff } }" /> -->
  <!-- <Class :is="CheckBox" text="XXXXX" :style="{ unchecked: defaultView, checked: defaultView, text: { fill: 0xffffff } }" /> -->
  <Class :is="RadioGroup" :items="routes" :selectedItem="0" type="vertical" :elementsMargin="10" :style="{ bg: aaa, checked: bbb, textStyle: { fill: 'red' } }" />

  <!-- main -->
  <Container y="60">
    <router-view />
  </Container>
</template>

<script setup lang="ts">
import { Layout, FancyButton, ButtonOptions, CheckBox, RadioGroup } from '@pixi/ui'
import { Container, DisplayObject, Graphics, Text, Transform } from 'pixi.js'
import { getCurrentInstance, onMounted, ref } from 'vue'

function checkBox(el: CheckBox) {
  el.onCheck.connect((checked) => {
    console.log(checked)
  })
  // el.onChange.connect((checked) => {
  //   console.log(checked)
  // })
}

const aaa = { color: 0xf1d583, width: 50, height: 50 }
const bbb = { color: 0xf1d583, width: 50, height: 50 }

const checked = () => new Graphics().beginFill(0xcccccc).drawRoundedRect(0, 0, 100, 40, 10).endFill()
const unchecked = () => new Graphics().beginFill(0xcccccc).drawRoundedRect(0, 0, 100, 40, 10).endFill()

const defaultView = new Graphics().beginFill(0xcccccc).drawRoundedRect(0, 0, 100, 40, 10).endFill()
const text = new Text('route', { fill: '#ffffff' })

const animations: ButtonOptions['animations'] = {
  hover: { props: { scale: { x: 1.1, y: 1.1 }, y: -2 }, duration: 100 },
  pressed: { props: { scale: { x: 0.9, y: 0.9 }, y: 4 }, duration: 100 }
}

function cb(el: FancyButton) {
  el.anchor.set(0.5, 0.5)
}

const routes = ['animation1', 'animation2', 'animation3', 'animation4']
</script>
