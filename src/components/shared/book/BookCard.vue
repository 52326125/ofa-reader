<script setup lang="ts">
import { toRefs } from 'vue'
import type { Book } from '@/interface/book'

import BaseButton from '@/components/shared/base/BaseButton.vue'

interface BookProps {
  book: Book
  loading?: boolean
  disabled?: boolean
}

interface BookEmit {
  (e: 'select', id: number): void
  (e: 'dbclick', id: number): void
  (e: 'actionClick', id: number): void
}

const props = defineProps<BookProps>()
const emit = defineEmits<BookEmit>()
const { book, loading, disabled } = toRefs(props)
const { id, title, cover, type } = toRefs(book.value)
const icons = {
  remote: 'download',
  local: 'upload'
}

const handleSelect = (id: number) => emit('select', id)
const handleDbclick = (id: number) => emit('dbclick', id)
const handleActionClick = (id: number) => emit('actionClick', id)
</script>

<template>
  <button
    class="book-container"
    :class="{ disabled }"
    @click="handleSelect(id)"
    @dblclick="handleDbclick(id)"
  >
    <div class="cover-container">
      <img :src="cover" class="cover" />
      <BaseButton
        class="btn-float"
        type="icon"
        v-if="type !== 'both'"
        @click.stop="handleActionClick(id)"
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

.cover
  height: 196px
  width: 100%
  object-fit: cover

.title
  display: block
  color: $on-surface
  padding: .5rem .5rem 0 .5rem
  text-align: center

.btn-float
  position: absolute
  left: .5rem
  bottom: 1rem

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
