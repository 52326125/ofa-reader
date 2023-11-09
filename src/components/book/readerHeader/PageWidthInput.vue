<script setup lang="ts">
import { toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'

import BaseInput from '@/components/base/BaseInput.vue'

const props = defineProps<{ modelValue: string }>()
const { modelValue } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const bookStore = useBookStore()
const { readerSetting } = storeToRefs(bookStore)

const handleChange = (value: string) => {
  const _value = Number(value)
  const navWidth = readerSetting.value.contents ? 240 : 0
  const maxWidth = window.innerWidth - navWidth - 200

  if (_value < 0) {
    value = '0'
  } else if (_value > maxWidth) {
    value = `${maxWidth}`
  } else {
    value = `${_value}`
  }

  emit('update:modelValue', value)
}
</script>
<template>
  <div class="setting-wrapper">
    <span>頁面大小</span>
    <BaseInput
      :model-value="modelValue as string"
      @change="handleChange"
      type="number"
      inputmode="numeric"
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
