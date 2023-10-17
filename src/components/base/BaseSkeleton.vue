<script setup lang="ts">
import { toRefs } from 'vue'

interface BaseSkeletonProps {
  width: string
  height: string
}

const props = withDefaults(defineProps<BaseSkeletonProps>(), {
  width: '100%',
  height: '1rem'
})
const { width, height } = toRefs(props)
</script>

<template>
  <div class="skeleton" :style="{ width, height }" />
</template>

<style scoped lang="sass">
.skeleton
  background: $neutral-80
  animation: skeleton-loading 1.5s infinite

@keyframes skeleton-loading
  0%
    opacity: 1

  50%
    opacity: .5

  100%
    opacity: 1
</style>
