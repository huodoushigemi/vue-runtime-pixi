import * as PIXI from 'pixi.js'
import { Application, Container, DisplayObject, IApplicationOptions } from 'pixi.js'
import { createRenderer, Renderer, RootRenderFunction, getCurrentInstance, Ref, App, Component } from 'vue'
import { makeMap } from '@vue/shared'

import components from './components'
import { nodeOps } from './nodeOps'

let renderer: Renderer<Container>

function ensureRenderer() {
  return (renderer ??= createRenderer(nodeOps))
}

type RootProps = { app: Application } & IApplicationOptions & Record<string, unknown>
type _App = App<Container> & { _props: RootProps; mount(stage?: Container) }

export const render: RootRenderFunction<Container> = (...args) => ensureRenderer().render(...args)

export const createApp = (root: Component, props?: Partial<RootProps>): _App => {
  props ??= {}
  props.app ??= new Application(props)
  const app = ensureRenderer().createApp(root, props) as _App
  app.use(components)
  //
  app.config.globalProperties.$app = props.app
  app.config.globalProperties.$stage = props.app.stage
  //
  const mount = app.mount
  app.mount = (stage = props.app.stage) => {
    return mount(stage, false, false)
  }
  return app
}

export const PIXI_TAG = Object.entries(PIXI)
  // @ts-ignore
  .filter(([key, val]) => val.prototype instanceof DisplayObject)
  .map(([e]) => e)

console.log(PIXI_TAG)

export const isPIXITag = makeMap(PIXI_TAG.join(','))

export const getStage = (): Container => getCurrentInstance().appContext.app.config.globalProperties.$stage
