<template>
  <div class="flex flex-col items-center justify-center p-4">
    <div class="timer text-lg font-bold mb-4">
      Time left: <span :class="timerColor">{{ state.counter }}</span
      >s
    </div>
    <div class="cards flex justify-center gap-1 mb-4">
      <PlayingCard
        v-for="card in dealtCards"
        :key="card"
        :card="card.slice(0, -1)"
        :suit="card.slice(-1)"
      />
    </div>
    <div class="options flex flex-col items-center gap-2">
      <BaseButton
        v-for="option in handOptions"
        :key="option"
        @click="selectHandRanking(option)"
        class="w-40"
      >
        {{ option }}
      </BaseButton>
    </div>
    <div v-if="randomWordMessage" class="random-word-message mt-4">
      {{ randomWordMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Hand } from 'pokersolver'
import { useGameStore } from '@/stores/gameStore'
import PlayingCard from '@/components/PlayingCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import { handRankings } from '@/consts/consts'

const {
  initializeDeck,
  startTimer,
  stopTimer,
  incrementCorrectAnswers,
  incrementCounter,
  decrementCounter,
  setCurrentView,
} = useGameStore()

const { state } = storeToRefs(useGameStore())
const dealtCards = ref<string[]>([])
const handOptions = ref<string[]>([])
const randomWordMessage = ref<string>('')

const timerColor = computed(() => (state.value.counter <= 10 ? 'text-red-500' : 'text-black'))

//Fisher-Yates (or Knuth) shuffle algorithm
const shuffleDeck = (deck: string[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

// Pick random hand options, ensuring one option is correct
const pickHandOptions = (correctHandName: string) => {
  const options = new Set<string>()
  options.add(correctHandName) // Add the correct hand ranking

  // Randomly add other hand rankings until we have 3 options
  while (options.size < 3) {
    const randomRanking = handRankings[Math.floor(Math.random() * handRankings.length)]
    options.add(randomRanking)
  }

  return shuffleDeck(Array.from(options))
}

const dealCards = () => {
  const shuffledDeck = shuffleDeck(state.value.deck)
  dealtCards.value = shuffledDeck.slice(0, 5)
  const hand = Hand.solve(dealtCards.value)
  handOptions.value = pickHandOptions(hand.name)
}

const selectHandRanking = (selectedRanking: string) => {
  stopTimer()
  const solvedHand = Hand.solve(dealtCards.value)
  if (solvedHand.name === selectedRanking) {
    incrementCorrectAnswers()
    incrementCounter()

    setCurrentView('correct')
  } else {
    decrementCounter()
    setCurrentView('wrong')
  }
}

onMounted(() => {
  if (!state.value.deck.length) initializeDeck()

  dealCards()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
