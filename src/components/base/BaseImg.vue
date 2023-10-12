<script setup lang="ts">
import { toRefs } from 'vue'

interface BaseImgProps {
  src?: string
  alt?: string
}

const props = defineProps<BaseImgProps>()
const { src } = toRefs(props)
</script>

<template>
  <div class="img-container">
    <img :src="src" :alt="alt" class="img" />
  </div>
</template>

<style scoped lang="sass">
.img-container
  position: relative

.img
  width: 100%
  height: 100%
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
