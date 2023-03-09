<template>
  <Sprite ref="character" />
</template>

<script setup lang="ts">
import { Graphics, Sprite, Text, Texture } from 'pixi.js'
import { ref } from 'vue'

const character = ref<Sprite>()
</script>
