<script setup lang="ts">
import { toRefs } from 'vue'
import { DISPLAY_MODE_LIST } from '@/data/book/readerSetting'

import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{ modelValue: string }>()
const { modelValue } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleClick = (value: string) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="setting-wrapper">
    <BaseButton
      type="base-icon"
      v-for="(item, index) in DISPLAY_MODE_LIST"
      :key="index"
      :class="{ selected: modelValue === item.value }"
      @click="handleClick(item.value)"
    >
      <template #icon>
        <span class="mdi" :class="item.text" />
      </template>
    </BaseButton>
  </div>
</template>
<style scoped lang="sass">
.setting-wrapper
  display: flex
  gap: .5rem
  align-items: center

.selected
  color: $primary
</style>
