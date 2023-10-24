import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import type { Book } from '@/interface/book'
import type { CreationNotification } from '@/interface/notification'

export const useBookStore = defineStore('book', () => {
  const notificationStore = useNotificationStore()
  const { add, remove } = notificationStore
  const books = ref<Book[] | null>(null)

  const upload = async (book: Book, cancelHandler: () => void) => {
    setTimeout(() => {
      const { title, cover, uid } = book
      const progress = 0
      const notification: CreationNotification<object> = {
        title,
        cover,
        type: 'progress',
        cancel: cancelHandler,
        payload: {
          bookId: uid,
          progress
        }
      }

      add(notification)
    }, 0)
  }

  const download = async (book: Book, cancelHandler: () => void) => {
    setTimeout(() => {
      const { title, cover, uid } = book
      const progress = 0
      const notification: CreationNotification<object> = {
        title,
        cover,
        type: 'progress',
        cancel: cancelHandler,
        payload: {
          bookId: uid,
          progress
        }
      }

      add(notification)
    }, 0)
  }

  const cancel = async (id: number) => {
    setTimeout(() => {
      remove(id)
    }, 0)
  }

  return { books, download, upload, cancel }
})
