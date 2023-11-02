<script setup lang="ts">
import {
  onMounted,
  ref,
  markRaw,
  watchEffect,
  computed,
  watch,
  toRefs
} from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { onKeyStroke } from '@vueuse/core'
import type { Book, Location } from 'epubjs'
import { useBookStore } from '@/stores/book'
import type { ISpine, IPackagingMetadataObject } from '@/interface/book'
import { getBookData } from '@/utils/epub'

import BaseButton from '@/components/base/BaseButton.vue'
import ChapterNav from '@/components/book/reader/ChapterNav.vue'
import ChapterProgressBar from '@/components/book/reader/ChapterProgressBar.vue'

const chapterProgressBarDisabled = ref(true)

const bookStore = useBookStore()
const { epubInfo, readerSetting } = storeToRefs(bookStore)

const route = useRoute()
const router = useRouter()
const uid = route.params.uid as string

const PAGE_HEIGHT = 'calc(100vh - 56px - 40px)'
const PAGE_HEIGHT__SCROLL = 'calc(100vh - 56px - 40px - 1px)'

const renderOption = computed(() => {
  const { pageWidth, displayMode } = toRefs(readerSetting.value)

  return {
    width: `${pageWidth.value}px`,
    height: displayMode.value === 'scroll' ? PAGE_HEIGHT__SCROLL : PAGE_HEIGHT,
    spread: displayMode.value === 'single' ? 'none' : 'always',
    flow: displayMode.value === 'scroll' ? 'scrolled' : 'paginated',
    manager: displayMode.value === 'scroll' ? 'continuous' : 'default'
  }
})

const epubTheme = computed(() => {
  const { lineHeight, fontFamily } = toRefs(readerSetting.value)

  return {
    '*': {
      'line-height': `${lineHeight.value}rem !important`,
      'font-family': `${fontFamily.value} !important`
    }
  }
})

const renderEpub = (epub: Book) => {
  if (epubInfo.value.rendition) epubInfo.value.rendition.destroy()

  epubInfo.value.rendition = markRaw(epub.renderTo('book', renderOption.value))
  epubInfo.value.rendition.themes.default(epubTheme.value)
  epubInfo.value.rendition.display()

  epubInfo.value.rendition.on('rendered', () => {
    const iframe = document.querySelector('iframe')?.contentDocument
    iframe?.addEventListener('click', toggleChapterControllerDisabled)
  })
}

const fetchData = async () => {
  try {
    const { epub, chapters } = await getBookData(uid)
    const metadata = (await epub.loaded.metadata) as IPackagingMetadataObject
    const { direction } = metadata
    epubInfo.value = {
      epub: markRaw(epub),
      chapters,
      direction: direction || 'ltr'
    }

    renderEpub(epub)
  } catch {
    router.push('/404')
  }
}

const toggleChapterControllerDisabled = () => {
  chapterProgressBarDisabled.value = !chapterProgressBarDisabled.value
}

const nextPage = () => epubInfo.value.rendition?.next()
const prevPage = () => epubInfo.value.rendition?.prev()

const nextChapterByNav = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentChapter, rendition } = epubInfo.value

  for (let i = 0; i < chapters.length - 1; i++) {
    const nextChapter = chapters[i + 1]

    if (chapters[i].href === currentChapter) {
      rendition?.display(nextChapter.href)
      break
    }
  }
}

const prevChapterByNav = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentChapter, rendition } = epubInfo.value

  for (let i = 1; i < chapters.length; i++) {
    const prevChapter = chapters[i - 1]

    if (chapters[i].href === currentChapter) {
      rendition?.display(prevChapter.href)
      break
    }
  }
}

const nextChapterByContent = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentChapter, rendition, epub } = epubInfo.value
  const { items } = epub?.spine as ISpine
  const findSpine = items.find((spine) => spine.href === currentChapter)

  if (!findSpine) return

  for (let i = findSpine.index; i < items.length; i++) {
    const findChapter = chapters.find(
      (chapter) => chapter.href === items[i].href
    )

    if (findChapter) {
      rendition?.display(findChapter.href)
      break
    }
  }
}

const prevChapterByContent = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentChapter, rendition, epub } = epubInfo.value
  const { items } = epub?.spine as ISpine
  const findSpine = items.find((spine) => spine.href === currentChapter)
  let findChapter

  if (!findSpine) return

  for (let i = findSpine.index; i >= 0; i--) {
    findChapter = chapters.find((chapter) => chapter.href === items[i].href)

    if (findChapter) break
  }

  for (let i = 1; i < chapters.length; i++) {
    const prevChapter = chapters[i - 1]

    if (chapters[i].href === findChapter?.href) {
      rendition?.display(prevChapter.href)
      break
    }
  }
}

const nextChapter = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentChapter } = epubInfo.value
  const findNavChapter = chapters.find(
    (chapter) => chapter.href === currentChapter
  )

  findNavChapter ? nextChapterByNav() : nextChapterByContent()
}

const prevChapter = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentChapter } = epubInfo.value
  const findNavChapter = chapters.find(
    (chapter) => chapter.href === currentChapter
  )

  findNavChapter ? prevChapterByNav() : prevChapterByContent()
}

const leftPageControllerClick = () => {
  epubInfo.value.direction === 'ltr' ? prevPage() : nextPage()
}

const rightPageControllerClick = () => {
  epubInfo.value.direction === 'ltr' ? nextPage() : prevPage()
}

const leftPageControllerKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.altKey) {
    epubInfo.value.direction === 'ltr' ? prevChapter() : nextChapter()
  } else {
    leftPageControllerClick()
  }
}

const rightPageControllerKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.altKey) {
    epubInfo.value.direction === 'ltr' ? nextChapter() : prevChapter()
  } else {
    rightPageControllerClick()
  }
}

watchEffect(() => {
  if (!epubInfo.value.rendition) return

  epubInfo.value.rendition.on('relocated', (location: Location) => {
    const { href } = location.start
    const findNavChapter = epubInfo.value.chapters?.find(
      (chapter) => chapter.href === href
    )
    epubInfo.value.currentChapter = href

    if (findNavChapter) {
      epubInfo.value.currentNavChapter = findNavChapter
    }
  })
})

watch(renderOption, async () => {
  const { epub } = await getBookData(uid)
  renderEpub(epub)
})

onKeyStroke('ArrowLeft', leftPageControllerKeydown)
onKeyStroke('ArrowRight', rightPageControllerKeydown)

onMounted(fetchData)
</script>

<template>
  <div class="reader-container">
    <ChapterNav :chapters="epubInfo.chapters" />
    <div class="reader-area" v-if="epubInfo.rendition">
      <div class="reader-page">
        <div class="reader-page-controller">
          <BaseButton type="base-icon" @click="leftPageControllerClick">
            <template #icon>
              <span class="mdi mdi-chevron-left" />
            </template>
          </BaseButton>
        </div>
        <article
          id="book"
          :style="{
            width: `${readerSetting.pageWidth}px`,
            height: PAGE_HEIGHT
          }"
        />
        <div class="reader-page-controller">
          <BaseButton type="base-icon" @click="rightPageControllerClick">
            <template #icon>
              <span class="mdi mdi-chevron-right" />
            </template>
          </BaseButton>
        </div>
        <div
          id="hidden"
          :style="{ width: `${readerSetting.pageWidth}px` }"
          class="reader-hidden"
        />
      </div>
      <ChapterProgressBar :disabled="chapterProgressBarDisabled" />
    </div>
  </div>
</template>

<style scoped lang="sass">
.reader-container
  height: calc(100vh - 56px)
  display: flex

.reader-area
  width: 100%

.reader-page
  display: flex

.reader-page-controller
  display: flex
  justify-content: center
  align-items: center
  flex: 1

.reader-hidden
  position: absolute
  left: 0
  top: 0
  z-index: -1

article
  background: $surface-container-high
  position: relative
</style>
