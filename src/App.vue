<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BookReaderLayout from '@/layouts/BookReaderLayout.vue'
</script>

<template>
  <BookReaderLayout v-if="$route.name === 'reader'" />
  <DefaultLayout v-else />
</template>

<style lang="sass">
@import '@/assets/sass/app'
</style>
