# Guess the Cards

"Guess the Cards" is an interactive card game built with Vue 3, where players test their knowledge of poker hands. In this fast-paced game, you have a limited amount of time to guess the correct poker hand from the cards dealt. With each correct guess, you earn additional time, but be careful—incorrect guesses will cost you!

## Game Features

- **Timed Rounds**: Start with 100 seconds on the clock. Time is your lifeline!
- **Poker Hand Recognition**: Challenge your ability to identify different poker hands.
- **Score Tracking**: Keep track of your correct answers and improve your high score.
- **Randomized Hands**: Each round presents a new set of cards and possible hand rankings.

## Tech Stack

- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
- **Vite**: A modern frontend build tool that provides a fast and lean development experience.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format code with Prettier

```sh
npm run format
```
