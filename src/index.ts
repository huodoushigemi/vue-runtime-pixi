import * as PIXI from 'pixi.js'
import { Application, Container, DisplayObject, IApplicationOptions } from 'pixi.js'
import { createRenderer, Renderer, RootRenderFunction, getCurrentInstance, ComponentPublicInstance, App, Component } from 'vue'
import { isString, makeMap } from '@vue/shared'

import components from './components'
import { nodeOps } from './nodeOps'

let renderer: Renderer<Container>

function ensureRenderer() {
  return (renderer ??= createRenderer(nodeOps))
}

type RootProps = { app: Application } & IApplicationOptions & Record<string, unknown>
interface _App extends App {
  _props: RootProps
  mount(c: string | Element): ComponentPublicInstance | null
}

export const render: RootRenderFunction<Container> = (...args) => ensureRenderer().render(...args)

export const createApp = (root: Component, props?: Partial<RootProps>): _App => {
  props ??= {}
  const app = props.app ?? new Application(props)
  //
  const vueapp = ensureRenderer().createApp(root, props) as _App
  vueapp.config.globalProperties.$app = app
  vueapp.config.globalProperties.$stage = app.stage
  vueapp.use(components)
  //
  const mount = vueapp.mount as App['mount']
  vueapp.mount = (c: string | Element): any => {
    const container = isString(c) ? document.querySelector(c) : c
    if (!container) return console.error(`Failed to mount app: mount target selector "${c}" returned null.`)
    container.appendChild(app.view)
    return mount(app.stage, false, false)
  }
  //
  return vueapp
}

export const PIXI_TAG = Object.entries(PIXI)
  // @ts-ignore
  .filter(([key, val]) => val.prototype instanceof DisplayObject)
  .map(([e]) => e)

console.log(PIXI_TAG)

export const isPIXITag = makeMap(PIXI_TAG.join(','))

export const getStage = (): Container => getCurrentInstance().appContext.app.config.globalProperties.$stage
