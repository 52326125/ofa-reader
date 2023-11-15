<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <a>
    <BaseButton type="primary">
      匯出
      <template #icon>
        <span class="mdi mdi-file" />
      </template>
    </BaseButton>
  </a>
</template>
