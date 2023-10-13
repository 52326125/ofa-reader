<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="container">
    <h1 class="text-primary">404 Error</h1>
    <p class="text-primary">您搜尋的頁面並不存在</p>
    <router-link to="/">
      <BaseButton reverse>
        首頁
        <template #icon>
          <span class="mdi mdi-home" />
        </template>
      </BaseButton>
    </router-link>
  </div>
</template>

<style scoped lang="sass">
h1
  font-size: 3rem

.text-primary
  color: $primary

.container
  min-height: calc(100vh - 56px - 2.5rem)
  display: flex
  flex-direction: column
  gap: 1rem
  justify-content: center
  align-items: center
</style>
