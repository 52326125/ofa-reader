<script setup lang="ts">
import { toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'

import BaseSlider from '@/components/base/BaseSlider.vue'

interface ChapterProgressBarProps {
  disabled?: boolean
}

const props = defineProps<ChapterProgressBarProps>()
const { disabled } = toRefs(props)

const bookStore = useBookStore()
const { epubInfo } = storeToRefs(bookStore)
</script>

<template>
  <div class="chapter-progress-bar-container" :class="{ hidden: disabled }">
    <input type="number" class="page-input" :min="1" :max="epubInfo.pages" />
    <span>{{ `/ ${epubInfo.pages}` }}</span>
    <BaseSlider class="chapter-slider" />
  </div>
</template>

<style scoped lang="sass">
.chapter-progress-bar-container
  display: flex
  width: 100%
  padding: .5rem 1rem
  line-height: 1.5rem
  background: $surface-container-high
  align-items: center
  box-sizing: border-box

.page-input
  padding: 0 .5rem
  font-weight: 400
  line-height: 1.5rem
  letter-spacing: .5px
  background: none
  border: none
  outline: none
  border-radius: .25rem
  width: 48px
  margin-right: .25rem
  @include border-shadow

.chapter-slider
  margin-left: 1.5rem
  margin-right: .5rem
  flex: 1
</style>
