<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import epub from 'epubjs'
import sparkMD5 from 'spark-md5'
import { useBookStore } from '@/stores/book'
import { bookIntroTable, type AddBookIntro } from '@/data/indexedDB/bookIntro'
import { bookFileTable } from '@/data/indexedDB/bookFile'
import { metadataTable } from '@/data/indexedDB/metadata'
import type { BookMetadata } from '@/utils/db'

import BaseInput from '@/components/base/BaseInput.vue'
import BookCard from '@/components/shared/book/BookCard.vue'
import UploadButton from '@/components/shared/UploadButton.vue'
import { arrayBufferMD5 } from '@/utils/hash'
import { arrayBuffer } from 'stream/consumers'

const filter = ref('')

const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

const EPUB_TYPE = 'application/epub+zip'

const fetchData = async () => {
  const localBooks = await bookIntroTable.get()
  books.value = localBooks.map((_book) => ({
    ..._book,
    type: 'local',
    cover: _book.cover ? URL.createObjectURL(_book.cover) : undefined
  }))
}

const handleFilterClear = () => (filter.value = '')

const getBookData = async (arrayBuffer: ArrayBuffer) => {
  const md5 = arrayBufferMD5(arrayBuffer)
  const book = epub(arrayBuffer)
  const intros = await bookIntroTable.get()
  const { title, description, creator, publisher, pubdate, language } =
    await book.loaded.metadata
  const metadata = {
    title,
    description,
    creator,
    publisher,
    pubdate: pubdate ? new Date(pubdate) : undefined,
    language
  }
  return {
    md5,
    book,
    intros,
    metadata
  }
}

const addIndexedDB = async (
  metadata: BookMetadata,
  cover: Blob | undefined,
  md5: string,
  file: File
) => {
  const { title, description, creator, publisher, pubdate, language } = metadata
  const newBookIntro: AddBookIntro = { title, cover, md5 }
  const newMetadata: BookMetadata = {
    title,
    description,
    creator,
    publisher,
    pubdate: pubdate ? new Date(pubdate) : undefined,
    language
  }

  const uid = await bookIntroTable.add(newBookIntro)
  bookFileTable.add({ uid, epub: file })
  metadataTable.add({ uid, data: newMetadata })

  fetchData()
}

const handleUpload = async (files: FileList) => {
  const file = files[0]

  if (file.type !== EPUB_TYPE) return

  const arrayBuffer = await file.arrayBuffer()
  const { md5, book, intros, metadata } = await getBookData(arrayBuffer)
  const findBook = intros.find((intro) => intro.md5 === md5)

  if (findBook) return

  const coverUrl = (await book.coverUrl()) ?? undefined
  let cover: Blob | undefined

  if (coverUrl) {
    const response = await fetch(coverUrl)
    cover = await response.blob()
  }

  await addIndexedDB(metadata, cover, md5, file)
}

const filteredBooks = computed(() => {
  if (!books.value) return []
  if (!filter.value) return books.value
  return books.value.filter((book) => book.title.includes(filter.value))
})

onMounted(fetchData)
</script>

<template>
  <div>
    <div class="tools">
      <div class="input">
        <BaseInput v-model="filter" @action-click="handleFilterClear">
          <span class="mdi mdi-close-circle-outline" />
        </BaseInput>
      </div>
      <UploadButton @upload="handleUpload" :accept="EPUB_TYPE" />
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
