<template>
  <div></div>
</template>

<script setup lang="ts">
import { Application, IApplicationOptions } from 'pixi.js'

const props = defineProps<IApplicationOptions>()

const app = new Application(props)
</script>
