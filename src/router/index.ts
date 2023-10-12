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
      path: '/book/detail/:id(\\d+)',
      name: 'book-detail',
      component: BookDetailView
    }
  ]
})

export default router
