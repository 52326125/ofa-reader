<script setup lang="ts">
import { toRefs } from 'vue'
import type { Chapter } from '@/interface/book'

import BaseButton from '@/components/base/BaseButton.vue'

interface ChapterItemProps {
  chapters: Chapter[]
  recursionTime?: number
}

const props = withDefaults(defineProps<ChapterItemProps>(), {
  recursionTime: 0
})
const { chapters, recursionTime } = toRefs(props)
</script>

<template>
  <div :style="{ marginLeft: `${recursionTime}rem` }">
    <div class="chapter-list">章節列表</div>
    <div class="chapter-item">
      <BaseButton
        v-for="chapter in chapters"
        :key="chapter.id"
        @click="chapter.href"
      >
        {{ chapter.label }}
      </BaseButton>
    </div>
  </div>
  <div v-for="chapter in chapters" :key="chapter.id">
    <ChapterItem
      v-if="chapter.subItems"
      :chapters="chapter.subItems"
      :recursion-time="recursionTime + 1"
    />
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
</style>
