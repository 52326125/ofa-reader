<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/book'
import { primaryTable } from '@/data/primary'
import { instanceTable } from '@/data/instance'
import { metadataTable } from '@/data/metadata'
import epub from 'epubjs'

import BaseInput from '@/components/base/BaseInput.vue'
import BookCard from '@/components/shared/book/BookCard.vue'
import UploadButton from '@/components/shared/UploadButton.vue'

const filter = ref('')

const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)
const { upload } = bookStore

const fetchData = async () => {
  const localBooks = await primaryTable.get()
  books.value = localBooks.map((_book) => ({
    ..._book,
    type: 'local',
    cover: _book.cover ? URL.createObjectURL(_book.cover) : undefined
  }))
}

const handleFilterClear = () => (filter.value = '')
const handleUpload = async (files: FileList) => {
  const file = files[0]
  const fileType = file.name.split('.').pop()

  if (fileType !== 'epub') return

  const arrayBuffer = await file.arrayBuffer()
  const book = epub(arrayBuffer)
  const primaries = await primaryTable.get()
  const { title, description, creator, publisher, pubdate, language } =
    await book.loaded.metadata
  const findBook = primaries.find((primary) => primary.title === title)

  if (findBook) return

  const coverUrl = (await book.coverUrl()) ?? undefined
  let cover: Blob | undefined

  if (coverUrl) {
    const response = await fetch(coverUrl)
    cover = await response.blob()
  }

  const newPrimary = { title, cover }
  const newMetadata = {
    title,
    description,
    creator,
    publisher,
    pubdate: pubdate ? new Date(pubdate) : undefined,
    language
  }

  await primaryTable.add(newPrimary)
  instanceTable.add(file)
  metadataTable.add(newMetadata)

  fetchData()
}

const filteredBooks = computed(() => {
  if (!books.value) return []
  if (!filter.value) return books.value
  return books.value.filter((book) => book.title.includes(filter.value))
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <div class="tools">
      <div class="input">
        <BaseInput v-model="filter" @action-click="handleFilterClear">
          <span class="mdi mdi-close-circle-outline" />
        </BaseInput>
      </div>
      <UploadButton @upload="handleUpload" />
    </div>
    <div class="book-list">
      <BookCard v-for="book in filteredBooks" :key="book.uid" :book="book" />
    </div>
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
