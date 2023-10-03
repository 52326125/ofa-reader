<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'

import BaseInput from '@/components/shared/base/BaseInput.vue'
import BaseButton from '@/components/shared/base/BaseButton.vue'
import BookCard from '@/components/shared/book/BookCard.vue'
import UploadButton from '@/components/shared/base/UploadButton.vue'

const filter = ref('')
const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)
</script>

<template>
  <main class="container">
    <div class="tools">
      <div class="input">
        <BaseInput v-bind="filter">
          <span class="mdi mdi-close-circle-outline" />
        </BaseInput>
      </div>
      <BaseButton type="primary">
        上傳
        <template #icon>
          <span class="mdi mdi-plus-circle-outline" />
        </template>
      </BaseButton>
      <UploadButton type="primary">
        上傳
        <template #icon>
          <span class="mdi mdi-plus-circle-outline" />
        </template>
      </UploadButton>
    </div>
    <div class="book-list">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </main>
</template>

<style scoped lang="sass">
.container
  max-width: 1200px
  padding-top: 2.5rem
  margin: 0 auto

.tools
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 1.5rem

.input
  width: 287px

.mdi-plus-circle-outline
  color: $on-primary
  font-size: 1.5rem

.book-list
  display: flex
  gap: 2rem
  flex-wrap: wrap
</style>
