<script setup lang="ts">
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from 'epubjs'
import { LAST_CHAPTER } from '@/data/localStorage'

import BaseButton from '@/components/base/BaseButton.vue'

interface ChapterItemProps {
  chapters: NavItem[]
}

const props = defineProps<ChapterItemProps>()
const { chapters } = toRefs(props)

const route = useRoute()
const uid = route.params.uid as string

const linkChapter = (href: string) => {
  localStorage.setItem(LAST_CHAPTER, href)
}
</script>

<template>
  <div>
    <div class="chapter-list">章節列表</div>
    <div class="chapter-item">
      <RouterLink
        :to="`/book/${uid}`"
        @click="linkChapter(chapter.href)"
        v-for="chapter in chapters"
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
