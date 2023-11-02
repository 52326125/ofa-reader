<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

import NotificationButton from '@/components/shared/appBar/NotificationButton.vue'
import NotificationList from '@/components/shared/appBar/NotificationList.vue'
import ReaderHeader from '@/components/book/readerHeader/Index.vue'
import logo from '@/assets/logo.png'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)

const route = useRoute()

const notificationOpen = ref(false)

const toggleNotificationOpen = () =>
  (notificationOpen.value = !notificationOpen.value)
</script>

<template>
  <header class="container">
    <div class="start-wrapper">
      <RouterLink to="/">
        <img :src="logo" alt="logo" class="logo" />
      </RouterLink>
      <template v-if="route.name === 'reader'">
        <div class="divider" />
        <ReaderHeader />
      </template>
    </div>
    <NotificationButton
      icon="bell"
      @click="toggleNotificationOpen"
      :hasNotification="notifications.length > 0"
    />
    <NotificationList v-if="notificationOpen" />
  </header>
</template>

<style scoped lang="sass">
.container
  box-sizing: border-box
  display: flex
  width: 100%
  justify-content: space-between
  align-items: center
  padding: .5rem 1rem
  position: relative
  z-index: 100
  @extend %app-bar

.logo
  height: 40px
  width: auto

.start-wrapper
  display: flex
  align-items: center
  gap: 1rem

.divider
  border-left: 2px solid $outline
  align-self: stretch
</style>
