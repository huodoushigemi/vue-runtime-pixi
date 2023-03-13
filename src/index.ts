/// <reference path="./global.d.ts" />

import { Application, Container, DisplayObject, IApplicationOptions } from 'pixi.js'
import { createRenderer, Renderer, RootRenderFunction, getCurrentInstance, ComponentPublicInstance, App, Component } from 'vue'

import components from './components'
export * from './components'
import { nodeOps } from './nodeOps'
export * from './nodeOps'
export * from './utils'
export * from './CustomPIXIComponent'

let renderer: Renderer<Container>

function ensureRenderer() {
  return (renderer ??= createRenderer(nodeOps))
}

type RootProps = { app: Application<HTMLCanvasElement> } & IApplicationOptions & Record<string, unknown>
// @ts-ignore
interface _App extends App<Container> {
  _props: RootProps
  mount(container: DisplayObject): ComponentPublicInstance
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
  return vueapp
}

export const getStage = (): Container => getCurrentInstance().appContext.app.config.globalProperties.$stage
