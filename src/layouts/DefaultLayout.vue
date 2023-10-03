<script setup lang="ts">
import AppBar from '@/components/shared/appBar/AppBar.vue'
</script>

<template>
  <div class="layout">
    <AppBar />
    <RouterView />
  </div>
</template>

<style scoped lang="sass">
.layout
  min-height: 100vh
  background: $surface-container
</style>
