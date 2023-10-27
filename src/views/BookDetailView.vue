<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type NavItem } from 'epubjs'
import type { Book } from '@/interface/book'
import { formatNullableString } from '@/utils/string'
import { formatDate } from '@/utils/date'
import { analysisEpub } from '@/utils/epub'

import BaseButton from '@/components/base/BaseButton.vue'
import ChapterItem from '@/components/shared/book/ChapterItem.vue'
import BaseImg from '@/components/base/BaseImg.vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import DownloadButton from '@/components/shared/DownloadButton.vue'
import bookCompletedImg from '@/assets/book_completed.png'
import { metadataTable } from '@/data/indexedDB/metadata'
import { bookIntroTable } from '@/data/indexedDB/bookIntro'
import { bookFileTable } from '@/data/indexedDB/bookFile'

const route = useRoute()
const id = route.params.id as string

const router = useRouter()

const book = ref<Omit<Book, 'type'> | null>(null)
const isBookCompleted = ref(false)
const loading = ref(true)
const chapters = ref<NavItem[]>([])
const epubInfo = ref<{ href: string; download: string } | null>(null)

const flatChapter = (chapter: NavItem): NavItem[] => {
  if (!chapter.subitems || chapter.subitems.length < 1) return [chapter]

  let _chapters: NavItem[] = [chapter]
  const subItems = chapter.subitems.map((subitem) => flatChapter(subitem)[0])

  return _chapters.concat(subItems)
}

const fetchData = async () => {
  const localIntro = await bookIntroTable.getByUid(id)
  const localMetadata = await metadataTable.get(id)
  const localFile = await bookFileTable.get(id)

  if (localIntro) {
    const { title, cover } = localIntro

    book.value = {
      uid: id,
      title,
      cover: cover ? URL.createObjectURL(cover) : undefined,
      ...localMetadata?.data
    }
  }

  if (localFile) {
    epubInfo.value = {
      href: URL.createObjectURL(localFile.epub),
      download: localFile.epub.name
    }
    const { epub } = await analysisEpub(localFile.epub)
    const navigation = await epub.loaded.navigation
    navigation.forEach((chapter) => {
      chapters.value.push(...flatChapter(chapter))
      return {}
    })
  }
}

onMounted(async () => {
  await fetchData()
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
        <RouterLink :to="`/book/${book?.uid}`">
          <BaseButton type="primary" :disabled="loading">開始閱讀</BaseButton>
        </RouterLink>
        <DownloadButton :href="epubInfo?.href" :download="epubInfo?.download" />
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
