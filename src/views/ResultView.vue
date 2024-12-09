<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-4 text-center" :class="resultColor">
      {{ resultTitle }}
    </h1>
    <p class="mb-4">{{ resultMessage }}</p>
    <BaseButton :state="buttonState" @click="setCurrentView('game')"> Continue </BaseButton>
    <div v-if="isLoading" class="flex justify-center items-center mt-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    <p v-else class="mt-4 text-center">{{ randomWordMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import { useGameStore } from '@/stores/gameStore'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps<{
  isCorrect?: boolean
}>()

const gameStore = useGameStore()
const { setCurrentView } = gameStore

const buttonState = computed(() => (props.isCorrect ? 'success' : 'error'))
const resultTitle = computed(() => (props.isCorrect ? 'Correct!' : 'Wrong!'))
const resultMessage = computed(() => `You ${props.isCorrect ? 'gain' : 'lose'} 10s`)
const resultColor = computed(() => (props.isCorrect ? 'text-green-500' : 'text-red-500'))

const randomWordMessage = ref('')
const isLoading = ref(false)

const getRandomWord = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('https://api.api-ninjas.com/v1/randomword', {
      headers: { 'X-Api-Key': import.meta.env.VITE_NINJAS_API_KEY },
      params: {
        type: 'noun',
      },
    })
    const randomWord = response.data.word
    randomWordMessage.value = generateFunnyMessage(randomWord, props.isCorrect)
  } catch (error) {
    console.error('Error fetching random word:', error)
  } finally {
    isLoading.value = false
  }
}

const generateFunnyMessage = (word: string, isCorrect: boolean) => {
  const templates = isCorrect
    ? [
        `Brilliant! Even a ${word} knows you got it right!`,
        `You're on a roll, just like a ${word}! Keep it up!`,
      ]
    : [
        `Oops! A ${word} would have guessed better!`,
        `Don't let this ${word} get you down. Try again!`,
      ]
  const template = templates[Math.floor(Math.random() * templates.length)]
  return template
}

getRandomWord()
</script>
