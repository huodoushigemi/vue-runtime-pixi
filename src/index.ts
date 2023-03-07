import * as PIXI from 'pixi.js'
import { Container, DisplayObject } from 'pixi.js'
import { createRenderer, Renderer, RootRenderFunction, CreateAppFunction } from 'vue'
import { makeMap } from '@vue/shared'

import { nodeOps } from './nodeOps'

let renderer: Renderer<Container>

function ensureRenderer() {
  return (renderer ??= createRenderer(nodeOps))
}

export const render: RootRenderFunction<Container> = (...args) => ensureRenderer().render(...args)

export const createApp: CreateAppFunction<Container> = (...args) => {
  const app = ensureRenderer().createApp(...args)
  // Object.defineProperty(app.config, 'isNativeTag', { value: isPIXITag, writable: false })
  // app.config.compilerOptions.isCustomElement = isPIXITag
  // app.config.isCustomElement = isPIXITag
  return app
}

export const PIXI_TAG = Object.entries(PIXI)
  // @ts-ignore
  .filter(([key, val]) => val.prototype instanceof DisplayObject)
  .map(([e]) => e)

export const isPIXITag = makeMap(PIXI_TAG.join(','))
