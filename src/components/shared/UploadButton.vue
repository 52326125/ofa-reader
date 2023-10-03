<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="upload-container">
    <BaseButton type="primary">
      <slot />
      <template #icon>
        <span class="mdi mdi-plus-circle-outline" />
      </template>
    </BaseButton>
    <input type="file" class="input" />
  </div>
</template>

<style scoped lang="sass">
.upload-container
  overflow: hidden
  position: relative
  display: inline-block

.input
  opacity: 0
  position: absolute
  left: 0
  top: 0
  height: 100%
  width: 100%
</style>
