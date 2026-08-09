<script lang="ts" setup>
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { ref } from 'vue'
import GuessInput from '@/components/GuessInput.vue'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => {
      return englishWords.includes(wordGiven)
    },
  },
})

const guessSubmitted = ref('')
</script>

<template>
  <div>
    <GuessInput @guess-submitted="(guess: string) => (guessSubmitted = guess)" />
    <p
      v-if="guessSubmitted.length > 0"
      style="color: #00b4d8"
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </div>
</template>
