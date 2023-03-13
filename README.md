<p align="center">
  <img src="https://raw.githubusercontent.com/huodoushigemi/vue-runtime-pixi/main/public/techs-free-weekend.png" alt="hero image" width="310" />
  <img src="https://raw.githubusercontent.com/huodoushigemi/vue-runtime-pixi/main/public/pixi.png" alt="pixijs" width="310" />
</p>

<h1 align="center">Vue Runtime Pixi</h1>

<p align="center">
  <strong>Vue createRenderer for PixiJS</strong>
  <br />
  <sub>Write PIXI applications using Vue SFC 👌</sub>
</p>

<br />

<p align="center">
  <img src="https://img.shields.io/github/forks/huodoushigemi/vue-runtime-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/github/stars/huodoushigemi/vue-runtime-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/dm/vue-runtime-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/pixi-v7+-ff69b4.svg?style=flat-square" alt="pixi version" />
</p>

<br />

## 📑 News!

- Full Vue3 support including [Vue Router](https://router.vuejs.org/)、[Pinia](https://pinia.vuejs.org/)、[VueUse](https://vueuse.org/)
- Typescript friendly

## 🌈 DEMO

- [exmaple-animation1](https://huodoushigemi.github.io/vue-runtime-pixi/#/Animation1)
- [exmaple-animation2](https://huodoushigemi.github.io/vue-runtime-pixi/#/Animation2)
- [exmaple-animation3](https://huodoushigemi.github.io/vue-runtime-pixi/#/Animation3)
- [exmaple-animation4](https://huodoushigemi.github.io/vue-runtime-pixi/#/Animation4)
- [exmaple-snake 🐍](https://huodoushigemi.github.io/vue-runtime-pixi/#/Snake%20🐍)
- [exmaple-plane-fights 🚀](https://huodoushigemi.github.io/vue-runtime-pixi/#/PlaneFights%20🚀)

## ⚙️ Installation

```shell
npm i -S vue-runtime-pixi vue pixi.js
```

## 🦄 Use

<!-- prettier-ignore -->
```html
<template>
  <h1>vue-runtime-pixi</h1>
  <Stage>
    <Text text="😉test……" style="fill: red" />
  </Stage>
</template>

<script setup lang="ts">
import { Stage } from 'vue-runtime-pixi'
</script>
```

```js
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { isPIXITag } from 'vue-runtime-pixi'

export default defineConfig({
  plugins: [vue({ template: { compilerOptions: { isCustomElement: isPIXITag } } })]
})
```

## Used with VueRouter

<!-- prettier-ignore -->
```html
<template>
  <h1>vue-runtime-pixi</h1>
  <Stage :uses="[router]">
    <router-view />
  </Stage>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Stage } from 'vue-runtime-pixi'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/aaa' },
    { path: '/aaa', component: { render: () => h('Text', { text: 'aaa……', style: 'fill: red' }) } },
    { path: '/bbb', component: { render: () => h('Text', { text: 'bbb……', style: 'fill: red' }) } }
  ]
})
</script>
```

## Components

Vue Runtime Pixi currently supports following components out of the box (but read Custom Components section if you need more):

#### `<Stage />`

Renders [Root Container] of any [`PIXI.Application`].

- `uses` - pass your own [`Vue.Plugins`] instance,
- `options` - pass only the [`PIXI.Application`] options.

[`<Container />`]
[`<Sprite />`]
[`<AnimatedSprite />`]
[`<Text />`]
[`<Graphics />`]
[`<TemporaryDisplayObject />`]
[`<Mesh />`]
[`<NineSlicePlane />`]
[`<SimpleMesh />`]
[`<SimplePlane />`]
[`<SimpleRope />`]
[`<ParticleContainer />`]
[`<TilingSprite />`]
[`<BitmapText />`]

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute, please write the issue or give me a Pull Request freely.

[![fork](https://img.shields.io/github/forks/huodoushigemi/vue-runtime-pixi.svg?style=flat-square)](https://github.com/huodoushigemi/vue-runtime-pixi)
[![fork](https://img.shields.io/github/stars/huodoushigemi/vue-runtime-pixi.svg?style=flat-square)](https://github.com/huodoushigemi/vue-runtime-pixi)

<!-- prettier-ignore-start -->
[PixiJS]: https://github.com/pixijs/pixi.js
[Vue]: https://github.com/vuejs/core
[`Vue.Plugins`]: https://vuejs.org/guide/reusability/plugins.html
[Root Container]: http://pixijs.download/release/docs/PIXI.Application.html#stage
[`PIXI.Application`]: http://pixijs.download/release/docs/PIXI.Application.html#stage
[`<Application />`]: http://pixijs.download/release/docs/PIXI.Application.html
[`<BitmapText />`]: http://pixijs.download/release/docs/PIXI.BitmapText.html
[`<Container />`]: http://pixijs.download/release/docs/PIXI.Container.html
[`<DisplayObject />`]: http://pixijs.download/release/docs/PIXI.DisplayObject.html 
[`<Graphics />`]: http://pixijs.download/release/docs/PIXI.Graphics.html
[`<NineSlicePlane />`]: http://pixijs.download/release/docs/PIXI.NineSlicePlane.html
[`<ObservablePoint />`]: http://pixijs.download/release/docs/PIXI.ObservablePoint.html
[`<ParticleContainer />`]: http://pixijs.download/release/docs/PIXI.ParticleContainer.html
[`<Point />`]: http://pixijs.download/release/docs/PIXI.Point.html
[`<Sprite />`]: http://pixijs.download/release/docs/PIXI.Sprite.html
[`<Text />`]: http://pixijs.download/release/docs/PIXI.Text.html
[`<TilingSprite />`]: http://pixijs.download/release/docs/PIXI.TilingSprite.html
[`<AnimatedSprite />`]: http://pixijs.download/release/docs/PIXI.AnimatedSprite.html
[`<Mesh />`]: http://pixijs.download/release/docs/PIXI.AnimatedSprite.html
[`<TemporaryDisplayObject />`]: http://pixijs.download/release/docs/PIXI.AnimatedSprite.html
[`<SimpleMesh />`]: http://pixijs.download/release/docs/PIXI.AnimatedSprite.html
[`<SimplePlane />`]: http://pixijs.download/release/docs/PIXI.AnimatedSprite.html
[`<SimpleRope />`]: http://pixijs.download/release/docs/PIXI.AnimatedSprite.html
<!-- prettier-ignore-end -->
