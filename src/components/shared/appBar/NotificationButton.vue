<script setup lang="ts">
import { toRefs } from 'vue'

import BaseButton from '@/components/base/BaseButton.vue'

interface NotificationButtonProps {
  icon: string
  hasNotification: boolean
}

interface NotificationButtonEmit {
  (e: 'click'): void
}

const props = defineProps<NotificationButtonProps>()
const emit = defineEmits<NotificationButtonEmit>()
const { icon } = toRefs(props)

const handleClick = () => emit('click')
</script>

<template>
  <BaseButton type="base-icon" class="notification" @click="handleClick">
    <template #icon>
      <span :class="['mdi', `mdi-${icon}`]" />
      <span class="mdi mdi-circle-medium" v-if="hasNotification" />
    </template>
  </BaseButton>
</template>

<style scoped lang="sass">
.notification
  position: relative

.mdi-circle-medium
  color: $error
  position: absolute
  right: -12px
  top: -12px
  @extend %icon

.mdi-bell
  @extend %icon
</style>
