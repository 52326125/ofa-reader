<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'
import { formatNullableString } from '@/utils/string'
import { formatDate } from '@/utils/date'
import type { Book, Chapter } from '@/interface/book'

import BaseButton from '@/components/base/BaseButton.vue'
import ChapterItem from '@/components/shared/book/ChapterItem.vue'
import BaseImg from '@/components/base/BaseImg.vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import bookCompletedImg from '@/assets/book_completed.png'

const route = useRoute()
const { id } = toRefs(route.params)

const router = useRouter()

const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

const book = ref<Book | null>(null)
const isBookCompleted = ref(false)
const loading = ref(true)
const chapters = ref<Chapter[]>([])

onMounted(() => {
  book.value = books.value?.find((book) => book.uid === id.value) || null
  loading.value = false
  if (!book.value) router.push('/404')
})
</script>

<template>
  <div>
    <div class="book-info">
      <BaseImg :src="book?.cover" v-if="!loading" />
      <BaseSkeleton v-else height="100%" />
      <div class="book-metadata">
        <div class="book-pubdata">
          <div v-if="!loading">
            <h1 class="title">{{ book?.title }}</h1>
            <p>作者：{{ formatNullableString(book?.creator) }}</p>
            <p>出版社：{{ formatNullableString(book?.publisher) }}</p>
            <p>出版日期：{{ formatDate(book?.pubdate) }}</p>
            <p>語言：{{ formatNullableString(book?.language) }}</p>
          </div>
          <div v-else class="book-pubdata__loading">
            <h1 class="title">
              <BaseSkeleton height="2.125rem" />
            </h1>
            <p v-for="i in 4" :key="i">
              <BaseSkeleton />
            </p>
          </div>
          <BaseImg
            :src="bookCompletedImg"
            alt="completed"
            v-if="isBookCompleted"
          />
        </div>
        <div class="description" v-html="book?.description" v-if="!loading" />
        <BaseSkeleton class="description" v-else />
      </div>
      <p class="last-time" v-if="book?.lastTime">
        最後閱讀時間：{{ formatDate(book.lastTime) }}
      </p>
      <BaseSkeleton v-if="loading" />
      <div class="actions">
        <BaseButton type="primary" :disabled="loading">開始閱讀</BaseButton>
        <BaseButton type="primary" :disabled="loading">
          匯出
          <template #icon>
            <span class="mdi mdi-file" />
          </template>
        </BaseButton>
      </div>
    </div>
    <div class="chapter-container" v-if="!loading">
      <ChapterItem :chapters="chapters" />
    </div>
    <BaseSkeleton v-else height="200px" />
  </div>
</template>

<style scoped lang="sass">
.book-info
  display: grid
  grid-template-columns: 248px 1fr
  grid-template-rows: 347px auto
  gap: 3rem 3.5rem
  margin-bottom: 3rem

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
  margin-bottom: .5rem

  &__loading
    width: 300px

.book-pubdata p
  margin-bottom: .5rem

.description
  flex: 1
  overflow: auto
  margin-left: .5rem

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
