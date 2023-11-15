import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  Notification,
  CreationNotification,
  SimpleNotification
} from '@/interface/notification'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification<object>[]>([])

  const add = async <T extends object>(
    notification: CreationNotification<T>
  ) => {
    const id =
      Math.max(...notifications.value.map((notification) => notification.id)) +
      1
    notifications.value.push({
      ...notification,
      id
    } as SimpleNotification)
  }

  const remove = async (id: number) => {
    setTimeout(() => {
      if (notifications.value) {
        notifications.value = notifications.value.filter(
          (notification) => notification.id !== id
        )
      }
    }, 0)
  }

  return { notifications, add, remove }
})
