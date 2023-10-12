<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="container">
    <h1>404 Error - 您搜尋的頁面並不存在</h1>
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
a
  text-decoration: none

.container
  display: flex
  gap: 1rem
  align-items: center
</style>
