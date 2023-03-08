<template>
  <Container ref="container" />
</template>

<script setup lang="ts">
import { Container } from 'pixi.js'
import { onMounted, ref } from 'vue'

const props = defineProps<{}>()

const container = ref<Container>()

onMounted(() => {
  console.log(111)
})
</script>
