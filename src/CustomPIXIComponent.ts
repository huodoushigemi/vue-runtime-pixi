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
  createElement: RO['createComment']
  patchProp?: RO['patchProp']
}

export const INJECTED: Record<string, CRO> = {}

export function CustomPIXIComponent(cro: CRO) {
  INJECTED[cro.name] = cro
}
