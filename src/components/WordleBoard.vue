<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'
import { ref } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    default: '',
  },
})

const guessInProgress = ref('')
const guessSubmitted = ref('')
</script>

<template>
  <div>
    <input
      type="text"
      v-model="guessInProgress"
      @keydown.enter="guessSubmitted = guessInProgress"
    />
    <p
      v-if="guessSubmitted.length > 0"
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </div>
</template>
