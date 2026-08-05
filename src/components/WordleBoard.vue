<script lang="ts" setup>
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { ref } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => {
      return (
        wordGiven.length === 5 &&
        wordGiven === wordGiven.toUpperCase() &&
        englishWords.includes(wordGiven)
      )
    },
  },
})

const guessInProgress = ref('')
const guessSubmitted = ref('')
</script>

<template>
  <div>
    <input
      v-model="guessInProgress"
      type="text"
      @keydown.enter="guessSubmitted = guessInProgress"
    />
    <p
      v-if="guessSubmitted.length > 0"
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </div>
</template>
