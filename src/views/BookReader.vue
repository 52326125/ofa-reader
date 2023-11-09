<script setup lang="ts">
import { onMounted, ref, markRaw, watchEffect, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { onKeyStroke } from '@vueuse/core'
import type { Book, Location } from 'epubjs'
import { useBookStore } from '@/stores/book'
import type { ISpine, IPackagingMetadataObject } from '@/interface/book'
import { getReadHistoryByUid, addReadHistory } from '@/data/book/readHistory'
import { getBookData } from '@/utils/epub'

import BaseButton from '@/components/base/BaseButton.vue'
import ChapterNav from '@/components/book/reader/ChapterNav.vue'

const bookStore = useBookStore()
const { epubInfo, readerSetting } = storeToRefs(bookStore)

const route = useRoute()
const router = useRouter()
const uid = route.params.uid as string

const epubRef = ref<Document | null>(null)

const PAGE_HEIGHT = 'calc(100vh - 56px)'
const PAGE_HEIGHT__SCROLL = 'calc(100vh - 56px - 1px)'

const directionIsLtr = computed(() => {
  return epubInfo.value.direction === 'ltr'
})

const renderOption = computed(() => {
  const { pageWidth, displayMode } = readerSetting.value

  return {
    width: `${pageWidth}px`,
    height: displayMode === 'scroll' ? PAGE_HEIGHT__SCROLL : PAGE_HEIGHT,
    spread: displayMode === 'single' ? 'none' : 'always',
    flow: displayMode === 'scroll' ? 'scrolled' : 'paginated',
    manager: displayMode === 'scroll' ? 'continuous' : 'default'
  }
})

const epubTheme = computed(() => {
  const { lineHeight, fontFamily } = readerSetting.value

  return {
    '*': {
      'line-height': `${lineHeight}rem !important`,
      'font-family': `${fontFamily} !important`,
      'writing-mode': directionIsLtr.value ? '' : 'tb-rl'
    }
  }
})

const renderEpub = (epub: Book) => {
  if (epubInfo.value.rendition) epubInfo.value.rendition.destroy()

  const readHistory = getReadHistoryByUid(uid)
  epubInfo.value.rendition = markRaw(epub.renderTo('book', renderOption.value))
  epubInfo.value.rendition.themes.default(epubTheme.value)

  if (readHistory) {
    try {
      epubInfo.value.rendition.display(readHistory.href)
    } catch {
      epubInfo.value.rendition.display(readHistory.idref)
    }
  } else {
    epubInfo.value.rendition.display()
  }

  epubInfo.value.rendition.on('rendered', () => {
    const iframe = document.querySelector('iframe')?.contentDocument
    epubRef.value = iframe || null
  })
}

const fetchData = async () => {
  try {
    if (epubInfo.value.epub) {
      const metadata = (await epubInfo.value.epub.loaded
        .metadata) as IPackagingMetadataObject
      const { direction } = metadata
      epubInfo.value.direction = direction || 'ltr'

      renderEpub(epubInfo.value.epub as Book)
      return
    }

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

const nextPage = () => epubInfo.value.rendition?.next()
const prevPage = () => epubInfo.value.rendition?.prev()

const nextChapter = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentNavChapter, rendition } = epubInfo.value

  for (let i = 0; i < chapters.length - 1; i++) {
    const nextChapter = chapters[i + 1]

    if (chapters[i].href === currentNavChapter?.href) {
      rendition?.display(nextChapter.href)
      break
    }
  }
}

const prevChapter = () => {
  if (!epubInfo.value.chapters) return

  const { chapters, currentNavChapter, rendition } = epubInfo.value

  for (let i = 1; i < chapters.length; i++) {
    const prevChapter = chapters[i - 1]

    if (chapters[i].href === currentNavChapter?.href) {
      rendition?.display(prevChapter.href)
      break
    }
  }
}

const leftPageControllerClick = () => {
  directionIsLtr.value ? prevPage() : nextPage()
}

const rightPageControllerClick = () => {
  directionIsLtr.value ? nextPage() : prevPage()
}

const leftPageControllerKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.altKey) {
    directionIsLtr.value ? prevChapter() : nextChapter()
  } else {
    leftPageControllerClick()
  }
}

const rightPageControllerKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.altKey) {
    directionIsLtr.value ? nextChapter() : prevChapter()
  } else {
    rightPageControllerClick()
  }
}

watchEffect(() => {
  if (!epubInfo.value.rendition) return

  epubInfo.value.rendition.on('relocated', (location: Location) => {
    const { href } = location.start
    const spines = epubInfo.value.epub?.spine as ISpine
    const findSpine = spines.items.find(
      (spine) => spine.href === href || spine.idref === href
    )
    const findNavChapter = epubInfo.value.chapters?.find(
      (chapter) => chapter.href === href
    )
    const readHistory = getReadHistoryByUid(uid)
    let findNav

    if (readHistory) {
      epubInfo.value.currentChapter = {
        href: readHistory.href,
        idref: readHistory.idref
      }
    }

    if (findSpine) {
      addReadHistory({
        uid,
        href: findSpine.href,
        idref: findSpine.idref
      })
    }

    if (findNavChapter) {
      epubInfo.value.currentNavChapter = findNavChapter
    } else {
      for (let i = 0; i < spines.items.length; i++) {
        const _findNav = epubInfo.value.chapters?.find((chapter) => {
          const { href: _href } = chapter

          if (
            _href === spines.items[i].href ||
            _href === spines.items[i].idref
          ) {
            return chapter
          }
        })

        if (_findNav) findNav = _findNav

        if (spines.items[i].href === href) {
          epubInfo.value.currentNavChapter = findNav
          break
        }
      }
    }
  })
})

watch([renderOption, epubTheme], async () => {
  renderEpub(epubInfo.value.epub as Book)
})

onKeyStroke('ArrowLeft', leftPageControllerKeydown)
onKeyStroke('ArrowRight', rightPageControllerKeydown)
onKeyStroke('ArrowLeft', leftPageControllerKeydown, { target: epubRef })
onKeyStroke('ArrowRight', rightPageControllerKeydown, { target: epubRef })

onMounted(fetchData)
</script>

<template>
  <div class="reader-container">
    <ChapterNav />
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
      </div>
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

article
  background: $surface-container-high
  position: relative
</style>
