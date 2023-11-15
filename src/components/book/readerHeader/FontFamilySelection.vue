<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue'
import { COMMON_FONTS } from '@/data/book/readerSetting'
import { LOCAL_FONT } from '@/data/permission'
import { mergeStringArray } from '@/utils/array'
import { checkPermission } from '@/utils/permission'

import BaseMenu from '@/components/base/BaseMenu.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{ modelValue: string }>()
const { modelValue } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const systemsFontFamilies = ref<string[]>([])
const settingStatus = ref<'requesting' | 'success'>('requesting')

const isRequiredApiExisted = computed(() => 'queryLocalFonts' in window)
const mergedFontFamilies = computed(() =>
  mergeStringArray(systemsFontFamilies.value, COMMON_FONTS)
)
const editableModelValue = computed({
  get() {
    return modelValue.value
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

onMounted(async () => {
  const hasPerm = await checkPermission(LOCAL_FONT)
  if (hasPerm) handleLoadLocalFont()
  if (!isRequiredApiExisted.value) settingStatus.value = 'success'
})

const handleLoadLocalFont = async () => {
  const fonts = await window.queryLocalFonts()
  systemsFontFamilies.value = fonts.reduce<string[]>((result, curr) => {
    if (!result.includes(curr.family)) result.push(curr.family)
    return result
  }, [])
  settingStatus.value = 'success'
}
</script>
<template>
  <base-button
    v-if="settingStatus === 'requesting'"
    @click="handleLoadLocalFont"
    title="啟用"
    :disabled="!isRequiredApiExisted"
  >
    啟用本地字體庫
  </base-button>
  <base-menu
    v-else
    :options="mergedFontFamilies"
    v-model="editableModelValue"
    dense
  />
</template>
