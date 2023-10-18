<script setup lang="ts">
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
</script>

<template>
  <VueSlider
    :process-style="{ background: '#845400' }"
    :dot-style="{
      border: '2px solid #845400'
    }"
  />
</template>

<style scoped lang="sass"></style>
