<script setup lang="ts">
import { toRefs } from 'vue'
import type { Book } from '@/interface/book'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseImg from '@/components/base/BaseImg.vue'

interface BookProps {
  book: Book
  loading?: boolean
  disabled?: boolean
}

interface BookEmit {
  (e: 'select', uid: string): void
  (e: 'dbclick', uid: string): void
  (e: 'actionClick', uid: string): void
}

const props = defineProps<BookProps>()
const emit = defineEmits<BookEmit>()
const { book, loading, disabled } = toRefs(props)
const { uid, title, cover, type } = toRefs(book.value)
const icons = {
  remote: 'download',
  local: 'upload'
}

const handleSelect = (uid: string) => emit('select', uid)
const handleDbclick = (uid: string) => emit('dbclick', uid)
const handleActionClick = (uid: string) => emit('actionClick', uid)
</script>

<template>
  <button
    class="book-container"
    :class="{ disabled }"
    @click="handleSelect(uid)"
    @dblclick="handleDbclick(uid)"
  >
    <div class="cover-container">
      <BaseImg
        :src="cover"
        width="100%"
        height="196px"
        :style="{ opacity: disabled ? 0.7 : 1 }"
      />
      <BaseButton
        class="btn-float"
        type="icon"
        v-if="type !== 'both'"
        @click.stop="handleActionClick(uid)"
      >
        <template #icon>
          <span
            class="mdi"
            :class="[`mdi-cloud-${icons[type]}`]"
            v-if="!loading"
          />
          <span class="mdi mdi-loading mdi-spin" v-else />
        </template>
      </BaseButton>
    </div>
    <span class="title ellipsis">
      {{ title }}
    </span>
  </button>
</template>

<style scoped lang="sass">
.book-container
  width: 156px
  transition: .3s all
  background: none
  padding: .5rem
  border-radius: 10px
  border: 1px solid rgba($outline, 0)
  cursor: pointer

  &:hover
    border-color: $outline

  &:focus
    border-color: $primary

.cover-container
  position: relative

.title
  display: block
  color: $on-surface
  padding: .5rem .5rem 0 .5rem
  text-align: center

.btn-float
  position: absolute
  left: .5rem
  bottom: .5rem

.mdi
  color: $on-primary

.mdi-loading:hover
  &::before
    content: "\F0156"
    animation: none

.disabled.container
  border: none

.disabled .cover, .disabled .title
  opacity: .7
</style>
