<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-4">Guess the Cards</h1>
    <BaseButton class="w-full" @click="startGame"> Play </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import BaseButton from '@/components/BaseButton.vue'

const { resetGame, setCurrentView } = useGameStore()

const startGame = () => {
  resetGame()
  setCurrentView('game')
}
</script>
