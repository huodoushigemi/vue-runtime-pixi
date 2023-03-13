import { makeMap } from '@vue/shared'
import * as PIXI from 'pixi.js'
import { DisplayObject } from 'pixi.js'

export function set(obj: Record<string, any>, key: string, val: any, op = '.', assign?: boolean) {
  const keys = key.split(op)
  obj = keys.slice(0, -1).reduce((o, e) => (o[e] ??= {}), obj)
  key = keys.at(-1)!
  return assign ? Object.assign(obj[key], val) : (obj[key] = val)
}

export function get(obj: Record<string, any>, key: string, op = '.') {
  return key.split(op).reduce((o, e) => o?.[e], obj)
}

export const PIXI_TAG = Object.entries(PIXI)
  // @ts-ignore
  .filter(([key, val]) => val.prototype instanceof DisplayObject)
  .map(([e]) => e)

export const isPIXITag = makeMap(PIXI_TAG.join(','))
