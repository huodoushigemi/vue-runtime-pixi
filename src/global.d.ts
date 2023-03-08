import type { Container, DisplayObject, Text, Graphics, TextStyle, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'

const pixi = { ...PIXI }

type Extract<T extends Record<string, any>, E> = { [K in keyof T]: T[K] extends E ? K : never }[keyof T]

type DisplayObjectKeys = Extract<typeof PIXI, typeof DisplayObject>

type Fun2Arr<T> = { [K in keyof T]?: T[K] extends (...args: infer A) => any ? A : T[K] }

type aaa = Fun2Arr<{ beginFill: Graphics['beginFill'] }>
// type aaa = Fun2Arr<{}>

type AAA = { [K in DisplayObjectKeys]: DefineComponent<Fun2Arr<typeof PIXI[K]>> }

interface _Text extends Text {
  style: any
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $stage: Container
  }

  export interface GlobalComponents extends AAA {
    Text: DefineComponent<Fun2Arr<_Text>>
    Graphics: DefineComponent<Fun2Arr<Graphics>>
    Sprite: DefineComponent<Fun2Arr<Sprite>>
    // Class: DefineComponent<{ is: DisplayObject | { prototype: DisplayObject } }>
  }
}
