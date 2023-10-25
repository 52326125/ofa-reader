<script setup lang="ts">
import { toRefs } from 'vue'

defineOptions({
  inheritAttrs: false
})

interface BaseInputProps {
  modelValue?: string
  disabled?: boolean
  error?: boolean
  tip?: string
  dense?: boolean
  shrink?: boolean
}

interface BaseInputEmit {
  (e: 'update:modelValue', value: string): void
  (e: 'action-click'): void
  (e: 'change', value: string): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<BaseInputEmit>()
const { disabled } = toRefs(props)

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const handleActionClick = () => emit('action-click')

const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('change', value)
}
</script>

<template>
  <div :class="{ disabled, error, dense, shrink }" class="input-wrapper">
    <div class="input-container">
      <input
        :value="modelValue"
        @input="handleInput"
        @change="handleChange"
        :disabled="disabled"
        class="input"
        v-bind="$attrs"
      />
      <div class="icon" @click="handleActionClick" v-if="!shrink">
        <slot></slot>
      </div>
    </div>
    <div class="tip" v-if="tip">{{ tip }}</div>
  </div>
</template>

<style scoped lang="sass">
.input-wrapper
  width: 210px

.input-container
  box-shadow: 0 0 0 1px $outline
  border-radius: 4px
  display: flex
  padding: .5rem .75rem .5rem 1rem
  transition: .1s all
  align-items: center
  box-sizing: border-box
  height: 56px

  &:has(.input:focus)
    box-shadow: 0 0 0 2px $primary

.input
  padding: .5rem 0
  border: none
  outline: none
  color: $on-surface
  width: 100%
  background: none
  line-height: 1.5rem

.icon
  font-size: 24px
  transition: .3s all
  cursor: pointer
  @extend %icon

.tip
  font-size: .75rem
  padding: .25rem 1rem
  color: $on-surface-variant
  transition: .3s all

.error
  .input-container
    box-shadow: 0 0 0 2px $error
  .icon
    color: $error
  .tip
    color: $error

.disabled
  .input-container
    box-shadow: 0 0 0 1px rgba($on-surface, .12)
  input
    @extend %disabled
  .icon
    @extend %disabled
  .tip
    cursor: not-allowed
    color: rgba($on-surface, .12)

.dense
  .input-container
    padding: .25rem .5rem
  input
    padding: 0

.shrink
  width: 60px
</style>
