<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { ref, toRefs } from 'vue'

interface DownloadButtonProps {
  href: string
}

const props = defineProps<DownloadButtonProps>()
const { href } = toRefs(props)

const anchorRef = ref<HTMLElement | null>(null)

const handleClick = () => {
  if (!anchorRef.value) return
  anchorRef.value.click()
}
</script>

<template>
  <BaseButton type="primary" @click="handleClick">
    匯出
    <template #icon>
      <span class="mdi mdi-file" />
    </template>
  </BaseButton>
  <a class="hidden" ref="anchorRef" :href="href" download />
</template>

<style scoped lang="sass"></style>
