<script setup lang="ts">
import { toRefs } from 'vue'

import BaseButton from '@/components/shared/base/BaseButton.vue'

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
    <span :class="['mdi', `mdi-${icon}`]" />
    <span class="mdi mdi-circle-medium" v-if="hasNotification" />
  </BaseButton>
</template>

<style scoped lang="sass">
.notification
  position: relative

.mdi-circle-medium
  font-size: 32px
  color: $error
  position: absolute
  right: -12px
  top: -12px
  @extend %icon

.mdi-bell
  font-size: 32px
  @extend %icon
</style>
