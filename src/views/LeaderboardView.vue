<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h1 class="text-3xl font-bold mb-8">Leaderboard</h1>
    <div v-if="state.leaderboard.length" class="w-full overflow-hidden">
      <table class="table-auto w-full">
        <thead class="bg-white">
          <tr>
            <th class="px-4 py-2 sticky top-0">Attempt</th>
            <th class="px-4 py-2 sticky top-0 cursor-pointer" @click="toggleSort">
              Answers
              <span v-if="sortDirection === 'ascending'">&#9650;</span>
              <span v-else-if="sortDirection === 'descending'">&#9660;</span>
              <span v-else class="text-gray-400">&#9650;&#9660;</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="w-full max-h-[50vh] overflow-auto">
      <table class="table-auto w-full">
        <tbody>
          <tr v-for="entry in sortedLeaderboard" :key="entry.attempt">
            <td class="border px-4 py-2">{{ entry.attempt }}</td>
            <td class="border px-4 py-2">{{ entry.correctAnswers }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-1 w-full">
      <BaseButton @click="playAgain" class="w-full mt-4">Play Again</BaseButton>
      <BaseButton
        v-if="state.leaderboard.length"
        @click="resetLeaderboard"
        class="w-full mt-4"
        state="error"
        >Reset Leaderboard</BaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const { resetGame, resetLeaderboard, setCurrentView } = useGameStore()
const { state } = storeToRefs(useGameStore())

type SortDirection = 'ascending' | 'descending' | 'neutral'
const sortDirection = ref<SortDirection>('neutral')

const sortedLeaderboard = computed(() => {
  if (sortDirection.value === 'neutral') return state.value.leaderboard

  return [...state.value.leaderboard].sort((a, b) => {
    if (sortDirection.value === 'ascending') {
      return a.correctAnswers - b.correctAnswers
    } else {
      return b.correctAnswers - a.correctAnswers
    }
  })
})

const toggleSort = () => {
  if (sortDirection.value === 'ascending') {
    sortDirection.value = 'descending'
  } else if (sortDirection.value === 'descending') {
    sortDirection.value = 'neutral'
  } else {
    sortDirection.value = 'ascending'
  }
}

const playAgain = () => {
  resetGame()
  setCurrentView('game')
}
</script>
