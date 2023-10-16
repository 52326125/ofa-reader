<script setup lang="ts"></script>

<template>
  <div class="skeleton-container" />
</template>

<style scoped lang="sass">
.skeleton-container
  display: inline-block
  width: 100%
  height: 1rem
  overflow: hidden
  background: $neutral-80
  animation: skeleton-loading 1.5s infinite

@keyframes skeleton-loading
  0%
    opacity: 1

  50%
    opacity: .5

  100%
    opacity: 1
</style>
