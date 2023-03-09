import { Assets, LoadAsset } from 'pixi.js'
import { ref, defineComponent, PropType, watchEffect } from 'vue'

export default defineComponent({
  name: 'AssetsLoad',
  props: {
    urls: [String, Array, Object] as PropType<string | LoadAsset | string[] | LoadAsset[]>
  },
  setup(props, { slots }) {
    const done = ref(false)

    // @ts-ignore
    Assets.load(props.urls).then(() => (done.value = true))

    watchEffect(() => {
      console.log(done.value)
    })

    return () => (done.value ? slots.default?.({ urls: props.urls }) : undefined)
  }
})
