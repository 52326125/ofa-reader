<script setup lang="ts">
import VueSlider from 'vue-slider-component'
</script>

<template>
  <VueSlider />
</template>

<style scoped lang="sass">
:deep(.vue-slider-rail)
  background: $neutral-80

:deep(.vue-slider-dot-handle)
  border-color: $primary

  &:has(.vue-slider:hover)
    border-color: $primary

:deep(.vue-slider-process)
  background: $primary

.vue-slider:hover
  &:deep(.vue-slider-dot-handle),
  &:deep(.vue-slider-dot-handle:hover)
    border-color: $primary-60

  &:deep(.vue-slider-process)
    background: $primary-60

:deep(.vue-slider-dot-handle-focus)
  box-shadow: 0 0 0 5px rgba($primary, .2)

:deep(.vue-slider-dot-tooltip-inner)
  background: $primary
  border-color: $primary
</style>
