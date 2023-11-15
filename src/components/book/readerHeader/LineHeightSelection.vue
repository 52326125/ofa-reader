<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { LINE_HEIGHT_LIST } from '@/data/book/readerSetting'

import BaseMenu from '@/components/base/BaseMenu.vue'

const props = defineProps<{ modelValue: string }>()
const { modelValue } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editableModelValue = computed({
  get() {
    return modelValue.value
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>
<template>
  <div class="setting-wrapper">
    <span>行高</span>
    <base-menu
      :options="LINE_HEIGHT_LIST"
      v-model="editableModelValue"
      dense
      shrink
    />
  </div>
</template>
<style scoped lang="sass">
.setting-wrapper
  display: flex
  gap: .5rem
  align-items: center
</style>
