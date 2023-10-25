<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import type { ProgressiveNotification } from '@/interface/notification'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseImg from '@/components/base/BaseImg.vue'

const notificationStore = useNotificationStore()
const { remove } = notificationStore
const { notifications } = storeToRefs(notificationStore)

const isInProgress = (notification: ProgressiveNotification) => {
  return !!notification.progress
}
</script>

<template>
  <div class="notification-container">
    <div
      class="notification-item"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <BaseImg :src="notification.cover" alt="cover" class="cover" />
      <div class="notification-info">
        <p class="notification-title ellipsis">{{ notification.title }}</p>
        <BaseButton
          type="base-icon"
          class="notification-remove"
          v-if="notification.type === 'progress' && isInProgress(notification)"
        >
          <span class="mdi mdi-close" @click="remove(notification.id)" />
        </BaseButton>
        <div
          class="progress"
          v-if="notification.type === 'progress' && isInProgress(notification)"
        >
          <div
            class="bar"
            :style="{
              width: `${notification.progress}%`
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.notification-container
  position: absolute
  right: 0
  top: 56px
  padding: 0 .5rem .5rem .5rem
  width: 400px
  height: 500px
  overflow-y: auto
  @extend %app-bar

.notification-item
  display: flex
  gap: 1rem
  padding: .5rem 1rem .5rem .5rem
  border-bottom: 1px solid $outline

.notification-info
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: 2fr 1fr
  width: 100%

.notification-title
  margin-top: .25rem
  grid-area: 1/1/1/2

.notification-remove
  grid-area: 1/2/1/3
  justify-self: right

.cover
  width: 40px
  height: 56px
  object-fit: cover

.mdi-close
  font-size: 32px
  @extend %icon

.progress
  grid-area: 2/1/2/3
  align-self: center
  border-radius: 10px
  border: 1px solid $outline
  width: 100%
  overflow: hidden

.bar
  height: 8px
  background: $primary
  border-radius: 10px
</style>
