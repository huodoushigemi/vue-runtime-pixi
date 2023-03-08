import { RendererOptions } from 'vue'
import { isOn, isString } from '@vue/shared'
import * as PIXI from 'pixi.js'
import { Container, DisplayObject, Sprite, Text, Texture } from 'pixi.js'
import patchEvent from './modules/event'
import { patchStyle } from './modules/style'
import { get, set } from './utils'

const OP = ':'

export const nodeOps: RendererOptions<DisplayObject | null, Container> = {
  createElement(type, isSVG, is, props) {
    let clazz
    if (type === 'Class') clazz = props.is?.prototype instanceof DisplayObject ? props.is : null
    else if (PIXI[type]?.prototype instanceof DisplayObject) clazz = PIXI[type]
    else if (globalThis[type]?.prototype instanceof DisplayObject) clazz = globalThis[type]
    return clazz ? (clazz.length == 1 ? new clazz(props) : new clazz()) : null
  },
  insert(el, parent, anchor) {
    if (!el || !parent) return
    const i = parent.children.indexOf(anchor)
    i > -1 ? parent.addChildAt(el, i) : parent.addChild(el)
  },
  remove(el) {
    el?.removeFromParent()
  },
  patchProp(el, key, preVal, nxtVal) {
    if (!el) return
    const ori = get(el, key, OP)
    if (typeof ori === 'function') {
      ori.apply(el, Array.isArray(nxtVal) ? nxtVal : [])
    } else if (isOn(key)) {
      patchEvent(el, key, nxtVal)
    } else {
      switch (key) {
        case 'style':
          patchStyle(el, preVal, nxtVal)
          break
        case 'texture':
          ;(el as Sprite).texture = isString(nxtVal) ? Texture.from(nxtVal) : nxtVal
          break
        default:
          set(el, key, nxtVal, OP)
          break
      }
    }
  },
  createText(text) {
    return new PIXI.Text(text)
  },
  createComment(text) {
    const comment = new PIXI.Text(`<!-- ${text} -->`)
    comment.visible = false
    return comment
  },
  setText(node: PIXI.Text, text) {
    node.text = text
  },
  setElementText() {},
  parentNode(node) {
    return node?.parent
  },
  nextSibling(node) {
    return node?.parent.children[node.parent.getChildIndex(node) + 1]
  }
}
