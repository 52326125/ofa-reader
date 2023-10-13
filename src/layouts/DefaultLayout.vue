<script setup lang="ts">
import AppBar from '@/components/shared/appBar/AppBar.vue'
</script>

<template>
  <div class="layout">
    <AppBar />
    <main class="main">
      <Transition name="fade">
        <RouterView />
      </Transition>
    </main>
  </div>
</template>

<style scoped lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: .3s all

.fade-enter-from,
.fade-leave-to
  opacity: 0

.layout
  min-height: 100vh
  background: $surface-container

.main
  max-width: 1200px
  padding-top: 2.5rem
  margin: 0 auto
</style>
