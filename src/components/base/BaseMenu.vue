<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { onKeyStroke, onClickOutside } from '@vueuse/core'

interface BaseMenuProps {
  options: string[]
  modelValue: string
}

const props = defineProps<BaseMenuProps>()
const { options, modelValue } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', selected: string): void
}>()

const isOpened = ref(false)
const isFocused = ref(false)
const selectedIndexPreview = ref<number | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const optionLength = computed(() => options.value.length)

const toggleOpen = () => {
  console.log('toggle')
  isOpened.value = !isOpened.value
  isFocused.value = !isFocused.value
}

const handleFocus = () => {
  isFocused.value = true
  isOpened.value = true
}

const handleBlur = () => {
  console.log('blur')
  isFocused.value = false
  isOpened.value = false
}

const handleClickOutSide = () => {
  console.log('click out side')
  if (!isOpened.value) return
  isOpened.value = false
  isFocused.value = false
}

const changeSelectionPreview = (direction: 'up' | 'down') => {
  if (selectedIndexPreview.value === null) {
    selectedIndexPreview.value = 0
    return
  }

  const nextIndex = selectedIndexPreview.value + (direction === 'up' ? -1 : 1)
  if (nextIndex < 0) {
    selectedIndexPreview.value = optionLength.value
  } else if (nextIndex === optionLength.value) {
    selectedIndexPreview.value = 0
  } else {
    selectedIndexPreview.value = nextIndex
  }
}

const handleArrowDownClick = () => {
  if (!isFocused.value) return
  changeSelectionPreview('down')
}

const handleArrowUpClick = () => {
  if (!isFocused.value || !isOpened.value) return
  changeSelectionPreview('up')
}

const handleEnterClick = () => {
  if (!isFocused.value || !isOpened.value) return

  const selected = options.value.find(
    (_, index) => index === selectedIndexPreview.value
  )
  if (!selected) return
  emit('update:modelValue', selected)
}

const handleOptionClick = (selectedIndex: number) => {
  const selected = options.value.find((_, index) => index === selectedIndex)
  if (!selected) return
  emit('update:modelValue', selected)
}

const isSelected = (index: number) => {
  return [selectedIndexPreview.value, modelValue.value].includes(index)
}

onClickOutside(menuRef, handleClickOutSide)

onKeyStroke('ArrowDown', handleArrowDownClick)
onKeyStroke('ArrowUp', handleArrowUpClick)
onKeyStroke('Enter', handleEnterClick)
</script>
<template>
  <div
    ref="menuRef"
    class="menu-wrapper"
    :class="isFocused && 'menu-wrapper__focus'"
    @click="toggleOpen"
  >
    <input
      inputmode="none"
      readonly
      @focus="handleFocus"
      @blur="handleBlur"
      v-model="modelValue"
    />
    <span class="mdi mdi-menu-up" v-if="isOpened" />
    <span class="mdi mdi-menu-down" v-else />
    <Transition name="fade">
      <div
        class="options-wrapper"
        :class="isOpened && 'options-wrapper__active'"
        v-if="isOpened"
      >
        <div
          class="option-content"
          v-for="(option, index) in options"
          :key="index"
          :class="{
            'option-content__selected': isSelected(index)
          }"
          @click="handleOptionClick(index)"
        >
          {{ option }}
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped lang="sass">
.menu-wrapper
  position: relative
  display: flex
  align-items: center
  width: 210px
  cursor: pointer
  padding: .5rem .75rem .5rem 1rem
  border-radius: 4px
  box-shadow: 0 0 0 1px $outline
  transition: .1s box-shadow
  box-sizing: border-box
  &__focus
    box-shadow: 0 0 0 2px $primary

input
  pointer-events: none
  width: 100%
  border: none
  outline: none
  background: none
  line-height: 1.5rem
  padding: .5rem 0

.mdi
  font-size: 24px

.options-wrapper
  position: absolute
  width: 210px
  left: 0
  top: calc( 100% + 2px )
  background-color: $surface-container
  box-shadow: $shadow-2
  overflow: hidden
  border-radius: 4px

.option-content
  padding: 1rem .75rem
  line-height: 1.5rem
  &:hover, &__selected
    background-color: $surface-container-high
</style>
