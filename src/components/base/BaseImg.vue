<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="img-container">
    <img class="img" v-bind="$attrs" />
  </div>
</template>

<style scoped lang="sass">
.img-container
  position: relative

.img
  width: 100%
  height: auto
  object-fit: cover

  &::before
    content: "\F02ED"
    font: normal normal normal 2rem "Material Design Icons"
    display: flex
    position: absolute
    justify-content: center
    align-items: center
    top: 0
    width: 100%
    height: 100%
    background-color: $neutral-50
    color: $on-primary
</style>
