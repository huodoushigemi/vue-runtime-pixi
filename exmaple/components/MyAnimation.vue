<template>
  <slot :value="animation" />
</template>

<script setup lang="ts">
import { useTransition } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  from: number
  to: number
}>()

const source = ref(props.from)
const animation = useTransition(source, { duration: 1000, delay: 100 })

source.value = props.to
</script>
