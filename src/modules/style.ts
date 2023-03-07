import { isString, parseStringStyle } from '@vue/shared'
import { DisplayObject, ITextStyle, Text, TextStyle } from 'pixi.js'

export function patchStyle(el: DisplayObject, preVal, nxtVal) {
  if (preVal == nxtVal && isString(nxtVal)) return
  if (el instanceof Text) {
    const style = (el as Text).style
    const preStyle = (isString(preVal) ? parseStringStyle(preVal) : preVal) as ITextStyle
    const nxtStyle = (isString(nxtVal) ? parseStringStyle(nxtVal) : nxtVal) as ITextStyle
    // (el as Text).style = new TextStyle(nxtStyle)
    // 由于直接 new TextStyle 开销较大，所以这里进行了优化
    for (const k in preStyle) if (!(k in nxtStyle)) style[k] = TextStyle.defaultStyle[k]
    Object.assign(style, nxtStyle)
  }
}
