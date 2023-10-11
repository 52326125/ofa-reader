<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'

import BaseButton from '@/components/base/BaseButton.vue'
import ChapterItem from '@/components/shared/book/ChapterItem.vue'
import bookCompleted from '@/assets/book_completed.png'

const route = useRoute()
const { id } = toRefs(route.params)
const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

const book = books.value?.find((book) => book.id === Number(id.value))

const lastTime = computed(() => {
  if (!book || !book.lastTime) return null

  const date =
    book.lastTime.getDate() < 10
      ? `0${book.lastTime.getDate()}`
      : book.lastTime.getDate()
  const month =
    book.lastTime.getMonth() + 1 < 10
      ? `0${book.lastTime.getMonth() + 1}`
      : book.lastTime.getMonth() + 1
  const year = book.lastTime.getFullYear()

  return `${year}/${month}/${date}`
})
</script>

<template>
  <div class="book-info">
    <img :src="book?.cover" alt="cover" class="cover" />
    <div class="book-metadata">
      <div class="book-pubdata">
        <div>
          <h1 class="title">{{ book?.title }}</h1>
          <p>作者：{{ book?.creator }}</p>
          <p>出版社：{{ book?.publisher || '-' }}</p>
          <p>出版日期：{{ book?.pubdate || '-' }}</p>
          <p class="language">語言：{{ book?.language }}</p>
        </div>
        <img :src="bookCompleted" alt="completed" class="book-completed" />
      </div>
      <div class="description" v-html="book?.description" />
    </div>
    <p class="last-time" v-if="lastTime">最後閱讀時間：{{ lastTime }}</p>
    <div class="actions">
      <BaseButton type="primary">開始閱讀</BaseButton>
      <BaseButton type="primary">
        匯出
        <template #icon>
          <span class="mdi mdi-file" />
        </template>
      </BaseButton>
    </div>
  </div>
  <div class="chapter-container">
    <ChapterItem :chapters="chapters" />
  </div>
</template>

<style scoped lang="sass">
.book-info
  display: grid
  grid-template-columns: 248px auto
  grid-template-rows: 347px auto
  gap: 3rem 3.5rem
  margin-bottom: 3rem

.cover
  width: 100%
  height: 100%
  object-fit: cover

.actions
  grid-area: 2/2/3/3

.title
  font-size: 2.125rem
  margin-bottom: 1rem

.book-metadata
  display: flex
  flex-direction: column

.book-pubdata
  display: flex
  justify-content: space-between

.book-completed
  width: 110px
  height: 100%
  margin-top: -2.125rem

.book-metadata p
  margin-bottom: .5rem

.book-metadata .language
  margin-bottom: 1rem

.description
  flex: 1
  overflow: auto
  padding-left: .5rem

.description :deep(p)
  margin-bottom: 1rem

.last-time
  padding-left: .5rem
  align-self: center

.actions
  display: flex
  gap: 1rem

.chapter-container
  width: 100%
</style>
