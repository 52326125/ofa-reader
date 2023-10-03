<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'

import BaseInput from '@/components/base/BaseInput.vue'
import BookCard from '@/components/shared/book/BookCard.vue'
import UploadButton from '@/components/shared/UploadButton.vue'

const filter = ref('')
const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

const handleFilterClear = () => (filter.value = '')
const filteredBooks = computed(() => {
  if (!books.value) return []
  if (!filter.value) return books.value
  return books.value.filter((book) => book.title.includes(filter.value))
})
</script>

<template>
  <div class="tools">
    <div class="input">
      <BaseInput v-model="filter" @action-click="handleFilterClear">
        <span class="mdi mdi-close-circle-outline" />
      </BaseInput>
    </div>
    <UploadButton />
  </div>
  <div class="book-list">
    <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
  </div>
</template>

<style scoped lang="sass">
.tools
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 1.5rem

.input
  width: 287px

.book-list
  display: flex
  gap: 2rem
  flex-wrap: wrap
</style>
