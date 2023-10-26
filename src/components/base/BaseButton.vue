<script setup lang="ts">
import { computed, toRefs } from 'vue'

type BaseButtonType = 'primary' | 'text' | 'icon' | 'outline' | 'base-icon'

interface BaseButtonProps {
  type?: BaseButtonType
  disabled?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'outline'
})

const { type, disabled, reverse } = toRefs(props)

const typeSelector = computed(() => {
  if (type.value === 'icon' || type.value === 'base-icon') {
    return `btn-${type.value}`
  } else {
    return `btn-not-icon btn-${type.value}`
  }
})
</script>

<template>
  <button class="btn" :class="[typeSelector, { reverse }]" :disabled="disabled">
    <div class="text ellipsis" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<style scoped lang="sass">
.btn
  display: flex
  justify-content: space-between
  align-items: center
  gap: .5rem
  box-sizing: border-box
  border-radius: 10px
  flex-shrink: 0
  height: 40px
  transition: .3s all
  cursor: pointer
  font-weight: 500

.btn-outline
  background: none
  border: 1px solid $neutral-variant-50
  color: $primary

  &:hover,&:focus
    @extend %primary-hover

  &:disabled
    @extend %disabled
    border-color: rgba($on-surface, .12)

  &:disabled:hover,&:disabled:focus
    background: none

.btn-primary
  background: $primary
  color: $on-primary
  border: 0

  &:hover,&:focus
    @extend %btn-primary-focus

  &:disabled
    @extend %disabled
    background: rgba($on-surface, .12)

  &:disabled:hover,&:disabled:focus
    box-shadow: none
    opacity: 1

.btn-text
  background: none
  border: none
  color: $primary

  &:hover,&:focus
    @extend %primary-hover

  &:disabled
    @extend %disabled

  &:disabled:hover,&:disabled:focus
    background: none

.btn-not-icon
  padding: .5rem
  width: 124px

.btn-icon
  padding: .25rem
  width: 40px
  border: none
  background: $primary
  color: $on-primary

  &:hover,&:focus
    @extend %opacity-hover

  &:disabled
    @extend %disabled
    background: rgba($on-surface, .12)

  &:disabled:hover,&:disabled:focus
    opacity: 1

.btn-base-icon
  padding: .25rem
  width: 40px
  background: none
  border: none

  &:hover,&:focus
    background: $neutral-80

  &:disabled
    @extend %disabled
    background: rgba($on-surface, .12)

  &:disabled:hover,&:disabled:focus
    background: rgba($on-surface, .12)

.btn .icon
  display: flex
  align-items: center
  font-size: 1.5rem
  color: inherit
  @extend %icon

.btn-icon .icon,.btn-base-icon .icon
  font-size: 2rem

.btn .text
  text-align: center
  width: 100%

.btn.reverse
  flex-direction: row-reverse
</style>
