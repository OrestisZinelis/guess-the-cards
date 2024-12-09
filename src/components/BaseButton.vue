<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    state?: 'success' | 'error' | 'default'
  }>(),
  {
    state: 'default',
  },
)

const buttonClass = computed(() => {
  const baseClasses = 'text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
  const stateClasses = {
    success: 'bg-green-500 hover:bg-green-600',
    error: 'bg-red-500 hover:bg-red-600',
    default: 'bg-blue-500 hover:bg-blue-600',
  }
  return `${baseClasses} ${stateClasses[props.state]}`
})
</script>
