import { DisplayObject } from 'pixi.js'
import { RendererOptions } from 'vue'

/**
 * Renderer Options
 */
export type RO = RendererOptions<DisplayObject, DisplayObject>

/**
 * Custom Renderer Options Key
 */
export const CRO_KEY = Symbol()

/**
 * Custom Renderer Options
 */
type CRO = {
  name: string
  createElement: (props: { [key: string]: any }) => DisplayObject
  patchProp?: RO['patchProp']
  onMounted?: RO['insert']
  onBeforeUnmount?: RO['remove']
}

export const INJECTED: Record<string, CRO | null> = {}

export function getCRO(el: DisplayObject) {
  return el[CRO_KEY] as CRO | null
}
export function setCRO(el: DisplayObject, cro: CRO) {
  el[CRO_KEY] = cro
}

export function CustomPIXIComponent(cro: CRO) {
  INJECTED[cro.name] = cro
}
