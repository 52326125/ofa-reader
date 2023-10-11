import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import BookDetailView from '@/views/BookDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bookDetail/:id(\\d+)',
      name: 'bookDetail',
      component: BookDetailView
    }
  ]
})

export default router
