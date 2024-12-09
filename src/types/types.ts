export interface GameState {
  deck: string[]
  counter: number
  currentGameCorrectAnswers: number
  leaderboard: LeaderboardEntry[]
  currentView: CurrentView
}

export interface LeaderboardEntry {
  attempt: number
  correctAnswers: number
}

export type CurrentView = 'start' | 'game' | 'correct' | 'wrong' | 'leaderboard'
