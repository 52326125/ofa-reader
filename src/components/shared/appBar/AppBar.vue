<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

import NotificationButton from '@/components/shared/appBar/NotificationButton.vue'
import NotificationList from '@/components/shared/appBar/NotificationList.vue'

import logo from '@/assets/logo.png'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)

const notificationOpen = ref(false)

const toggleNotificationOpen = () =>
  (notificationOpen.value = !notificationOpen.value)
</script>

<template>
  <header class="container">
    <img :src="logo" alt="logo" class="logo" />
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
  @extend %app-bar

.logo
  height: 40px
  width: auto
</style>
