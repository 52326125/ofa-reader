<script setup lang="ts">
import { toRefs } from 'vue'

defineOptions({
  inheritAttrs: false
})

interface BaseImgProps {
  width?: string
  height?: string
}

const props = withDefaults(defineProps<BaseImgProps>(), {
  width: '100%',
  height: 'auto'
})
const { width, height } = toRefs(props)
</script>

<template>
  <div class="img-container">
    <img class="img" v-bind="$attrs" :style="{ width, height }" />
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
