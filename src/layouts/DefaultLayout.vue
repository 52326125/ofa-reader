<script setup lang="ts">
import AppBar from '@/components/shared/appBar/AppBar.vue'
</script>

<template>
  <main class="layout">
    <AppBar />
    <div class="main">
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="sass">
.layout
  min-height: 100vh
  background: $surface-container

.main
  max-width: 1200px
  padding-top: 2.5rem
  margin: 0 auto
</style>
