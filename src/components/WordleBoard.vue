<script lang="ts" setup>
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { computed, ref, triggerRef } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => {
      return englishWords.includes(wordGiven)
    },
  },
})

const guessInProgress = ref<string | null>(null)
const guessSubmitted = ref('')

const formattedGuessInProgress = computed<string>({
  get() {
    return guessInProgress.value ?? ''
  },
  set(rawValue: string) {
    guessInProgress.value = rawValue
      .replace(/[^A-Z]+/gi, '')
      .slice(0, WORD_SIZE)
      .toUpperCase()
    triggerRef(formattedGuessInProgress)
  },
})

function onSubmit() {
  if (!englishWords.includes(formattedGuessInProgress.value)) {
    return
  }
  guessSubmitted.value = formattedGuessInProgress.value
}
</script>

<template>
  <div>
    <input
      v-model="formattedGuessInProgress"
      :maxlength="WORD_SIZE"
      type="text"
      @keydown.enter="onSubmit"
    />
    <p
      v-if="guessSubmitted.length > 0"
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </div>
</template>
