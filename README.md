# `Developing……`

# vue-runtime-pixi

# 🌈 DEMO
- [exmaple-animation1]()
- [exmaple-animation2]()
- [exmaple-animation3]()
- [exmaple-animation4]()
- [exmaple-snake 🐍]()
- [exmaple-plane-fights ✈]()

# ⚙️ Installation
```shell
npm i -S vue-runtime-pixi
```

# 🦄 Use
```js
// main.ts
import { Application } from 'pixi.js'
import { createApp, h } from 'vue'
import { createApp as createPIXI } from 'vue-runtime-pixi'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

const { stage, view } = new Application()

createPIXI({
  setup() {
    return () => h('Text', { text: 'test……', style: 'fill: red' })
  }
}).mount(stage)

document.querySelector('#app').appendChild(view)

```
```js
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { isPIXITag } from 'vue-runtime-pixi'

export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { isCustomElement: isPIXITag } } })
  ]
})

```

# ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

# 👏 Contributing

If you have any questions or requests or want to contribute, please write the issue or give me a Pull Request freely.

[![fork](https://img.shields.io/github/forks/huodoushigemi/vue-runtime-pixi.svg?style=flat-square)](https://github.com/huodoushigemi/vue-runtime-pixi)
[![fork](https://img.shields.io/github/stars/huodoushigemi/vue-runtime-pixi.svg?style=flat-square)](https://github.com/huodoushigemi/vue-runtime-pixi)
