<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { ref } from 'vue'

interface UploadButtonEmit {
  (e: 'upload', files: FileList): void
}

const emit = defineEmits<UploadButtonEmit>()

const inputRef = ref<HTMLElement | null>()

const handleClick = () => {
  if (!inputRef.value) return
  inputRef.value.click()
}

const handleUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  emit('upload', target.files)
}
</script>

<template>
  <BaseButton type="primary" @click="handleClick">
    匯入
    <template #icon>
      <span class="mdi mdi-plus-circle-outline" />
    </template>
  </BaseButton>
  <input type="file" class="input" ref="inputRef" @change="handleUpload" />
</template>

<style scoped lang="sass">
.input
  display: none
</style>
