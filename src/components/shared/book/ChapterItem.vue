<script setup lang="ts">
import { useRoute } from 'vue-router'
import { readHistoryHelper } from '@/data/book/readHistory'

import BaseButton from '@/components/base/BaseButton.vue'
import type { ISpine } from '@/interface/book'
import { useBookStore } from '@/stores/book'
import { storeToRefs } from 'pinia'

const bookStore = useBookStore()
const { epubInfo } = storeToRefs(bookStore)

const route = useRoute()
const uid = route.params.uid as string

const linkChapter = (href: string) => {
  const spines = epubInfo.value.epub?.spine as ISpine
  const findSpine = spines.items.find(
    (spine) => spine.href === href || spine.idref === href
  )

  if (findSpine) {
    readHistoryHelper.add({
      uid,
      href: findSpine.href,
      idref: findSpine.idref
    })
  }
}
</script>

<template>
  <div>
    <div class="chapter-list">章節列表</div>
    <div class="chapter-item">
      <RouterLink
        :to="`/book/${uid}`"
        @click="linkChapter(chapter.href)"
        v-for="chapter in epubInfo.chapters"
        :key="chapter.id"
        :title="chapter.label"
      >
        <BaseButton>
          {{ chapter.label }}
        </BaseButton>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="sass">
.chapter-list
  border-bottom: 1px solid $primary
  margin-bottom: .5rem

.chapter-item
  padding: .5rem 1rem 1rem 1rem
  display: flex
  gap: 1rem
  flex-wrap: wrap
</style>
