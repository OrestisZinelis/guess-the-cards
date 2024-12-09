<template>
  <div
    class="relative border border-black rounded bg-white p-4 w-32 h-48 flex flex-col items-center justify-center"
  >
    <div class="absolute top-1 left-1">
      <div :class="color" class="text-lg font-bold">{{ displayValue }}</div>
      <div :class="color" class="text-sm">{{ displaySuit }}</div>
    </div>
    <div :class="color" class="text-6xl">{{ displaySuit }}</div>
    <div class="absolute bottom-1 right-1 transform rotate-180">
      <div :class="color" class="text-lg font-bold">{{ displayValue }}</div>
      <div :class="color" class="text-sm">{{ displaySuit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cardSuitSymbols, cardValues } from '@/consts/consts'

const props = defineProps<{
  card: string
  suit: string
}>()

const displayValue = cardValues[props.card] || props.card
const displaySuit = cardSuitSymbols[props.suit]
const color = ['h', 'd'].includes(props.suit) ? 'text-red-500' : 'text-black'
</script>
