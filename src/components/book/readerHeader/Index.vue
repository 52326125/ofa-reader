<script setup lang="ts">
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'
import type { ReaderSettingKey } from '@/interface/book'

import ContentsSwitch from './ContentsSwitch.vue'
import FontFamilySelection from './FontFamilySelection.vue'
import LineHeightSelection from './LineHeightSelection.vue'
import DisplayModeSwitch from './DisplayModeSwitch.vue'
import PageWidthInput from './PageWidthInput.vue'

defineOptions({
  name: 'ReaderHeader'
})

const bookStore = useBookStore()
const { readerSetting } = storeToRefs(bookStore)

const settingComponent: Partial<Record<ReaderSettingKey, Component>> = {
  contents: ContentsSwitch,
  fontFamily: FontFamilySelection,
  lineHeight: LineHeightSelection,
  displayMode: DisplayModeSwitch,
  pageWidth: PageWidthInput
}
</script>
<template>
  <div class="reader-header-wrapper">
    <div
      class="func-wrapper"
      v-for="(value, key) in settingComponent"
      :key="key"
    >
      <component :is="value" v-model="readerSetting[key]" />
    </div>
  </div>
</template>
<style scoped lang="sass">
.reader-header-wrapper
  display: flex
  gap: 1rem

.func-wrapper
  display: flex
  align-items: center
  &::after
    margin-left: 1rem
    content: ''
    border-left: 1px solid $outline
    align-self: stretch
</style>
