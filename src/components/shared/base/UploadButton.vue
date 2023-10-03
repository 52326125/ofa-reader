<script setup lang="ts">
import { computed, toRefs } from 'vue'

type UploadButtonType = 'primary' | 'text' | 'icon' | 'outline' | 'base-icon'

interface UploadButtonProps {
  type?: UploadButtonType
  disabled?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<UploadButtonProps>(), {
  type: 'outline'
})

const { type, disabled, reverse } = toRefs(props)

const typeSelector = computed(() => {
  if (type.value === 'icon' || type.value === 'base-icon') {
    return `btn-${type.value}`
  } else {
    return `btn-not-icon btn-${type.value}`
  }
})
</script>

<template>
  <label class="btn" :class="[typeSelector, { reverse }]" :disabled="disabled">
    <input type="file" class="input" />
    <div class="text ellipsis" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
  </label>
</template>

<style scoped lang="sass">
.input
  display: none
</style>
