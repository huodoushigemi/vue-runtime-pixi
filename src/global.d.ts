/// <reference path="../node_modules/@pixi/app" />

import type { Container, DisplayObject, Text, Graphics, TextStyle, Sprite, AnimatedSprite, BitmapText, TilingSprite, ParticleContainer, SimpleRope, SimplePlane, SimpleMesh, NineSlicePlane, Mesh, TemporaryDisplayObject, ITextStyle, ICanvas, Application } from 'pixi.js'
// import * as PIXI from 'pixi.js'
import { DefineComponent } from 'vue'

// type Extract<T extends Record<string, any>, P> = { [K in keyof T]: ExtendOf<T[K], P> extends true ? K : never }[keyof T]
// type DisplayObjectKeys = Extract<typeof PIXI, DisplayObject>

// prettier-ignore
type ExtendOf<T, P, TRUE = true, FALSE = false> = T extends null | undefined ? FALSE :
  T extends P ? TRUE :
  T extends { prototype: infer V } ? ExtendOf<V, P, TRUE, FALSE> :
  FALSE

type Fun2Arr<T> = {
  [K in keyof T]?: T[K] extends (...args: infer A) => any ? (A extends [] ? boolean | [] : A) : T[K]
}
type DefineDO<T> = DefineComponent<Fun2Arr<T>>

interface _Text extends Text {
  style: string | Partial<ITextStyle>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $stage: Container
    $app: Application
  }

  export interface GlobalComponents extends DisplayObjects {
    AssetsLoad: typeof import('./components')['AssetsLoad']
  }

  type DisplayObjects = {
    Container: DefineDO<Container>
    Sprite: DefineDO<Sprite & { image: string }>
    AnimatedSprite: DefineDO<AnimatedSprite>
    Text: DefineDO<_Text>
    Graphics: DefineDO<Graphics>
    TemporaryDisplayObject: DefineDO<TemporaryDisplayObject>
    Mesh: DefineDO<Mesh>
    NineSlicePlane: DefineDO<NineSlicePlane>
    SimpleMesh: DefineDO<SimpleMesh>
    SimplePlane: DefineDO<SimplePlane>
    SimpleRope: DefineDO<SimpleRope>
    ParticleContainer: DefineDO<ParticleContainer>
    TilingSprite: DefineDO<TilingSprite>
    BitmapText: DefineDO<BitmapText>
    Class: DefineComponent<{ is: DisplayObject | typeof DisplayObject }>
  }
}
