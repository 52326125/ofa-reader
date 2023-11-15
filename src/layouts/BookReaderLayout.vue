<script setup lang="ts">
import AppBar from '@/components/shared/appBar/AppBar.vue'
</script>

<template>
  <div class="layout">
    <AppBar />
    <main>
      <Transition name="fade">
        <RouterView />
      </Transition>
    </main>
  </div>
</template>

<style scoped lang="sass">
.layout
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 56px 1fr
</style>
