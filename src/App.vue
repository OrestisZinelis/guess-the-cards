<template>
  <div id="app">
    <BaseModal>
      <StartView v-if="state.currentView === 'start'" />
      <GameView v-else-if="state.currentView === 'game'" />
      <ResultView v-else-if="state.currentView === 'correct'" is-correct />
      <ResultView v-else-if="state.currentView === 'wrong'" />
      <LeaderboardView v-else-if="state.currentView === 'leaderboard'" />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import StartView from '@/views/StartView.vue'
import GameView from '@/views/GameView.vue'
import ResultView from '@/views/ResultView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'

const { state } = storeToRefs(useGameStore())
</script>
