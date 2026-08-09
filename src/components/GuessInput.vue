<script lang="ts" setup>
import { WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { computed, ref, triggerRef } from 'vue'

const guessInProgress = ref<string | null>(null)

const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()
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
  emit('guess-submitted', formattedGuessInProgress.value)
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
  </div>
</template>
