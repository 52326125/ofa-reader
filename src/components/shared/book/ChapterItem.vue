<script setup lang="ts">
import { toRefs } from 'vue'
import type { Chapter } from '@/interface/book'

import BaseButton from '@/components/base/BaseButton.vue'

interface ChapterItemProps {
  chapters: Chapter[]
}

const props = defineProps<ChapterItemProps>()
const { chapters } = toRefs(props)
</script>

<template>
  <div v-for="chapter in chapters" :key="chapter.id">
    <div class="chapter-list">{{ chapter.label }}</div>
    <div class="chapter-item">
      <BaseButton
        @click="chapter.href"
        v-if="!chapter.subitems || chapter.subitems.length < 1"
      >
        {{ chapter.label }}
      </BaseButton>
      <div
        style="margin-left: 1rem; width: 100%"
        v-if="chapter.subitems && chapter.subitems.length > 0"
      >
        <ChapterItem :chapters="chapter.subitems" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.chapter-list
  border-bottom: 1px solid $primary
  margin-bottom: .5rem

.chapter-item
  padding: .5rem 0 1rem 1rem
  display: flex
  gap: 1rem
  flex-wrap: wrap
</style>
