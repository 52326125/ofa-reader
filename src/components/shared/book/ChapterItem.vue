<script setup lang="ts">
import { toRefs } from 'vue'
import type { NavItem } from 'epubjs'

import BaseButton from '@/components/base/BaseButton.vue'

interface ChapterItemProps {
  chapters: NavItem[]
}

const props = defineProps<ChapterItemProps>()
const { chapters } = toRefs(props)
</script>

<template>
  <div>
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
