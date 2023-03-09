import { Assets, LoadAsset } from 'pixi.js'
import { ref, defineComponent, PropType, watchEffect, watch } from 'vue'

export default defineComponent({
  name: 'AssetsLoad',
  props: {
    urls: [String, Array, Object] as PropType<string | LoadAsset | string[] | LoadAsset[]>
  },
  setup(props, { slots }) {
    const done = ref(0)

    watchEffect(
      () => {
        // @ts-ignore
        Assets.load(props.urls).then(() => done.value++)
      },
      { flush: 'pre' }
    )

    return () => (done.value ? slots.default?.({ urls: props.urls }) : undefined)
  }
})
