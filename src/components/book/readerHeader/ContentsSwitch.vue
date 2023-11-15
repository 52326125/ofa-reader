<script setup lang="ts">
import { toRefs } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{ modelValue: boolean }>()
const { modelValue } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const handleClick = () => {
  emit('update:modelValue', !modelValue.value)
}
</script>
<template>
  <base-button
    type="base-icon"
    :class="modelValue && 'selected'"
    @click="handleClick"
  >
    <template #icon>
      <span class="mdi mdi-view-list" />
    </template>
  </base-button>
</template>
<style scoped lang="sass">
.selected
  color: $primary
</style>
