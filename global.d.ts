import type { Texture, utils, IPoint, Geometry, Point } from '@pixi/core'
import type { Container, DisplayObject, Text, Graphics, TextStyle, Sprite, AnimatedSprite, BitmapText, TilingSprite, ParticleContainer, SimpleRope, SimplePlane, SimpleMesh, NineSlicePlane, Mesh, TemporaryDisplayObject, ITextStyle, Application, DisplayObjectEvents, MeshMaterial } from 'pixi.js'
// import * as PIXI from 'pixi.js'
import type { DefineComponent } from 'vue'

// type Extract<T extends Record<string, any>, P> = { [K in keyof T]: ExtendOf<T[K], P> extends true ? K : never }[keyof T]
// type DisplayObjectKeys = Extract<typeof PIXI, DisplayObject>

// prettier-ignore
// type ExtendOf<T, P, TRUE = true, FALSE = false> = T extends null | undefined ? FALSE :
// T extends P ? TRUE :
// T extends { prototype: infer V } ? ExtendOf<V, P, TRUE, FALSE> :
// FALSE

declare type Fun2Arr<T> = {
  [K in keyof T]?: T[K] extends (...args: infer A) => any ? (A extends [] ? boolean | [] : A) : T[K]
}

type Events = { [K in keyof DisplayObjectEvents as `on${Capitalize<K>}`]: utils.EventEmitter.EventListener<DisplayObjectEvents, K> }

type IsP<T, P, TRUE, FALSE> = T extends `${P}${infer S}` ? TRUE : FALSE
type ExcludeP<T, P> = Exclude<{ [K in keyof T]: IsP<K, P, never, K> }[keyof T], undefined>

type DefineDO<T> = DefineComponent<Fun2Arr<Pick<T, ExcludeP<T, '_' | 'on'>>> & Partial<Events>>

interface _Text extends Text {
  style: TextStyle | Partial<ITextStyle> | string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $stage: Container
    $app: Application<HTMLCanvasElement>
  }

  export interface GlobalComponents extends DisplayObjects {
    AssetsLoad: typeof import('vue-runtime-pixi/components')['AssetsLoad']
  }

  type DisplayObjects = {
    Container: DefineDO<Container>
    Sprite: DefineDO<Sprite & { image: string }>
    AnimatedSprite: DefineDO<AnimatedSprite> & DefineComponent<{ texture: Texture }>
    Text: DefineDO<_Text>
    Graphics: DefineDO<Graphics>
    TemporaryDisplayObject: DefineDO<TemporaryDisplayObject>
    Mesh: DefineDO<Mesh> & DefineComponent<{ geometry: Geometry; shader: MeshMaterial }>
    NineSlicePlane: DefineDO<NineSlicePlane> & DefineComponent<{ texture: Texture }>
    SimpleMesh: DefineDO<SimpleMesh>
    SimplePlane: DefineDO<SimplePlane> & DefineComponent<{ texture: Texture }>
    SimpleRope: DefineDO<SimpleRope> & DefineComponent<{ texture: Texture; points: Point[] }>
    ParticleContainer: DefineDO<ParticleContainer>
    TilingSprite: DefineDO<TilingSprite> & DefineComponent<{ texture: Texture }>
    BitmapText: DefineDO<BitmapText>
    Class: DefineComponent<{ is: DisplayObject | typeof DisplayObject }>
  }
}
