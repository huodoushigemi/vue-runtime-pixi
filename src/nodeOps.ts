import { RendererOptions } from 'vue'
import { isOn, isString } from '@vue/shared'
import * as PIXI from 'pixi.js'
import { AnimatedSprite, BitmapText, Container, DisplayObject, Graphics, Mesh, NineSlicePlane, ParticleContainer, SimpleMesh, SimplePlane, SimpleRope, Sprite, TemporaryDisplayObject, Text, Texture, TilingSprite } from 'pixi.js'
import patchEvent from './modules/event'
import { patchStyle } from './modules/style'
import { INJECTED, getCRO, setCRO } from './CustomPIXIComponent'
import { get, set } from './utils'

const OP = ':'

export const nodeOps: RendererOptions<DisplayObject | null, Container> = {
  createElement(type, isSVG, is, props) {
    props ??= {}
    switch (type) {
      case 'Sprite':
        return new Sprite(props.texture)
      case 'BitmapText':
        return new BitmapText(props.text)
      case 'TilingSprite':
        return new TilingSprite(props.texture)
      case 'SimpleRope':
        return new SimpleRope(props.texture, props.points)
      case 'SimplePlane':
        return new SimplePlane(props.texture)
      case 'NineSlicePlane':
        return new NineSlicePlane(props.texture)
      case 'Mesh':
        return new Mesh(props.geometry, props.shader)
      case 'Graphics':
        return new Graphics(props.geometry)
      case 'AnimatedSprite':
        return new AnimatedSprite(props.textures)
      case 'ParticleContainer':
        return new ParticleContainer()
      case 'Text':
        return new Text()
      case 'SimpleMesh':
        return new SimpleMesh(props.texture)
      case 'TemporaryDisplayObject':
        return new TemporaryDisplayObject()
      case 'Container':
        return new Container()
    }
    //
    if (props.is instanceof DisplayObject) return props.is
    //
    let clazz
    if (type === 'Class') clazz = props.is?.prototype instanceof DisplayObject ? props.is : null
    else if (PIXI[type]?.prototype instanceof DisplayObject) clazz = PIXI[type]
    // new clazz
    if (clazz) return clazz.length == 1 ? new clazz(props) : new clazz()

    // Custom Renderer Options
    const cro = INJECTED[type]
    if (cro) {
      const el = cro.createElement(props)
      setCRO(el, cro)
      return el
    } else {
      console.error(`Component not defined: ${type}`)
      return new Text(`Component not defined: ${type}`, { fill: 0xff0000 })
    }
  },
  insert(el, parent, anchor) {
    if (!el || !parent) return
    const i = parent.children.indexOf(anchor)
    i > -1 ? parent.addChildAt(el, i) : parent.addChild(el)
    // Custom Renderer Options
    getCRO(el)?.onMounted?.(el, parent, anchor)
  },
  remove(el) {
    if (!el) return
    // Custom Renderer Options
    getCRO(el)?.onBeforeUnmount?.(el)
    el.removeFromParent()
  },
  patchProp(el, key, preVal, nxtVal) {
    if (!el) return
    const ori = get(el, key, OP)
    if (typeof ori === 'function') {
      ori.apply(el, Array.isArray(nxtVal) ? nxtVal : [])
    } else if (isOn(key)) {
      patchEvent(el, key, nxtVal)
    } else {
      if (key.at(-1) == '+') {
        return set(el, key.slice(0, -1), nxtVal, OP, true)
      }
      switch (key) {
        case 'style':
          if (el instanceof Text) return patchStyle(el as any, preVal, nxtVal)
        case 'image':
          if (el instanceof Sprite) return (el.texture = isString(nxtVal) ? Texture.from(nxtVal) : nxtVal)
        default:
          // Custom Renderer Options
          const cro = getCRO(el)
          if (cro?.patchProp) {
            cro.patchProp(el, key, preVal, nxtVal)
          } else {
            set(el, key, nxtVal, OP)
          }
          break
      }
    }
  },
  createText(text) {
    return new Text(text)
  },
  createComment(text) {
    const comment = new Text(`<!-- ${text} -->`)
    comment.visible = false
    return comment
  },
  setText(node: Text, text) {
    node.text = text
  },
  setElementText() {},
  parentNode(node) {
    return node?.parent
  },
  nextSibling(node) {
    return node?.parent?.children[node.parent.getChildIndex(node) + 1]
  }
}
