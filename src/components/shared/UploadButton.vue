<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { ref, toRefs } from 'vue'

interface UploadButtonProps {
  accept: string
}

interface UploadButtonEmit {
  (e: 'upload', files: FileList): void
}

const props = defineProps<UploadButtonProps>()
const { accept } = toRefs(props)
const emit = defineEmits<UploadButtonEmit>()

const inputRef = ref<HTMLElement | null>(null)

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
  <input
    type="file"
    class="input"
    ref="inputRef"
    @change="handleUpload"
    :accept="accept"
  />
</template>

<style scoped lang="sass">
.input
  display: none
</style>
