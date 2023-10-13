<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'
import { formatNullableString } from '@/utils/string'
import { formatDate } from '@/utils/date'
import type { Book } from '@/interface/book'

import BaseButton from '@/components/base/BaseButton.vue'
import ChapterItem from '@/components/shared/book/ChapterItem.vue'
import BaseImg from '@/components/base/BaseImg.vue'
import bookCompletedImg from '@/assets/book_completed.png'

const route = useRoute()
const { id } = toRefs(route.params)

const router = useRouter()

const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

const book = ref<Book | null>(null)
const isBookCompleted = ref(false)

onMounted(() => {
  book.value = books.value?.find((book) => book.id === Number(id.value)) || null

  if (!book.value) router.push('/404')
})
</script>

<template>
  <div>
    <div class="book-info" v-if="book">
      <BaseImg :src="book.cover" />
      <div class="book-metadata">
        <div class="book-pubdata">
          <div>
            <h1 class="title">{{ book.title }}</h1>
            <p>作者：{{ formatNullableString(book.creator) }}</p>
            <p>出版社：{{ formatNullableString(book.publisher) }}</p>
            <p>出版日期：{{ formatDate(book.pubdate) }}</p>
            <p class="language">
              語言：{{ formatNullableString(book.language) }}
            </p>
          </div>
          <BaseImg
            :src="bookCompletedImg"
            alt="completed"
            v-if="isBookCompleted"
          />
        </div>
        <div class="description" v-html="book.description" />
      </div>
      <p class="last-time" v-if="book.lastTime">
        最後閱讀時間：{{ formatDate(book.lastTime) }}
      </p>
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

.book-pubdata p
  margin-bottom: .5rem

.book-pubdata .language
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