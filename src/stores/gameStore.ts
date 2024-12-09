import type { GameState, LeaderboardEntry, CurrentView } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const COUNTER = 100
const COUNTER_CHANGE = 5
const LEADERBOARD_KEY = 'guess-the-cards-leaderboard'

export const useGameStore = defineStore('game', () => {
  const state = ref<GameState>({
    deck: [],
    counter: COUNTER,
    currentGameCorrectAnswers: 0,
    leaderboard: JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? '[]'),
    currentView: 'start',
  })

  const initializeDeck = () => {
    const suits = ['h', 'd', 'c', 's']
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
    state.value.deck = suits.flatMap((suit) => values.map((value) => value + suit))
  }

  let timerInterval: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    stopTimer()
    timerInterval = setInterval(() => {
      if (state.value.counter > 0) {
        state.value.counter--
      } else {
        stopTimer()
        saveToLeaderboard()
        setCurrentView('leaderboard')
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  const setCurrentView = (view: CurrentView) => {
    state.value.currentView = view
  }

  const incrementCounter = () => {
    state.value.counter += COUNTER_CHANGE
  }

  const decrementCounter = () => {
    state.value.counter = Math.max(0, state.value.counter - COUNTER_CHANGE) // Prevent negative values
  }

  const resetCounter = () => {
    state.value.counter = COUNTER
  }

  const incrementCorrectAnswers = () => {
    state.value.currentGameCorrectAnswers++
  }

  const resetCurrentGameCorrectAnswers = () => {
    state.value.currentGameCorrectAnswers = 0
  }

  const saveToLeaderboard = () => {
    const newEntry: LeaderboardEntry = {
      attempt: state.value.leaderboard.length + 1,
      correctAnswers: state.value.currentGameCorrectAnswers,
    }
    state.value.leaderboard.push(newEntry)
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(state.value.leaderboard))
  }

  const resetLeaderboard = () => {
    state.value.leaderboard = []
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(state.value.leaderboard))
  }

  const resetGame = () => {
    resetCounter()
    resetCurrentGameCorrectAnswers()
  }

  return {
    state,
    initializeDeck,
    startTimer,
    stopTimer,
    setCurrentView,
    incrementCounter,
    decrementCounter,
    resetCounter,
    incrementCorrectAnswers,
    resetCurrentGameCorrectAnswers,
    saveToLeaderboard,
    resetLeaderboard,
    resetGame,
  }
})
