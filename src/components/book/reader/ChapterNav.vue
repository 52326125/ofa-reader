<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
const { readerSetting, epubInfo } = storeToRefs(bookStore)

const linkChapter = (href: string) => epubInfo.value.rendition?.display(href)
</script>

<template>
  <nav :class="{ hidden: readerSetting.contents }">
    <a
      href="#"
      class="nav-item"
      :class="[
        chapter.href === epubInfo.currentNavChapter?.href
          ? 'nav-item__active'
          : ''
      ]"
      v-for="chapter in epubInfo.chapters"
      :key="chapter.id"
      @click="linkChapter(chapter.href)"
    >
      {{ chapter.label }}
    </a>
  </nav>
</template>

<style scoped lang="sass">
nav
  width: 240px
  height: 100%
  background: $surface-container-high
  box-sizing: border-box
  overflow: auto
  padding: 0 .5rem
  flex-shrink: 0

.nav-item
  display: block
  padding: .5rem 0
  color: $on-surface-variant
  font-weight: 400
  line-height: 1.5rem
  @include border-bottom-shadow($color: $outline-variant)

  &__active
    font-weight: 700
</style>
