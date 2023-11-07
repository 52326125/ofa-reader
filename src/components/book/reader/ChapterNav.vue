<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'
import type { ISpine } from '@/interface/book'

const bookStore = useBookStore()
const { readerSetting, epubInfo } = storeToRefs(bookStore)

const linkChapter = (href: string) => {
  const spines = epubInfo.value.epub?.spine as ISpine
  const findSpine = spines.items.find(
    (spine) => spine.href === href || spine.idref === href
  )

  try {
    epubInfo.value.rendition?.display(findSpine?.href)
  } catch {
    epubInfo.value.rendition?.display(findSpine?.idref)
  }
}
</script>

<template>
  <nav :class="{ __hidden: readerSetting.contents }">
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
  transition: .3s all

  &.__hidden
    transform: translate(-240px)
    width: 0

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
