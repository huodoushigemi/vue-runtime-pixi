import { DisplayObject, DisplayObjectEvents } from 'pixi.js'

export default function patchEvent(el: DisplayObject & { _vei?: any }, key: string, val) {
  el.interactive = true
  const name = key.slice(2).toLowerCase() as keyof DisplayObjectEvents
  const invoker = ((el._vei ??= {})[key] ??= createInvoker(el, name, val))
  if (val) invoker.value = val
  else el.off(name, invoker)
}

function createInvoker(el: DisplayObject, name: keyof DisplayObjectEvents, val) {
  const invoker = () => invoker.value()
  invoker.value = val
  el.on(name, invoker)
  return invoker
}
