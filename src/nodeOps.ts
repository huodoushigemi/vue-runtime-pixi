import { RendererOptions } from 'vue'
import { isOn, isString } from '@vue/shared'
import * as PIXI from 'pixi.js'
import { Container, DisplayObject, Sprite, Texture } from 'pixi.js'
import patchEvent from './modules/patchEvent'
import { get, set } from './utils'
import { patchStyle } from './modules/style'

const OP = ':'

export const nodeOps: RendererOptions<DisplayObject | null, Container> = {
  createElement(type) {
    if (PIXI[type]?.prototype instanceof DisplayObject) return new PIXI[type]()
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
