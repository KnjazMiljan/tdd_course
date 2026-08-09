<script lang="ts" setup>
import { WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { computed, ref, triggerRef } from 'vue'
import GuessView from '@/components/GuessView.vue'

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })

const guessInProgress = ref<string | null>(null)
const inputElement = ref<HTMLInputElement | null>(null)

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
  guessInProgress.value = null
}
</script>

<template>
  <div>
    <GuessView v-if="!disabled" :guess="formattedGuessInProgress" />
    <input
      ref="inputElement"
      v-model="formattedGuessInProgress"
      :disabled="disabled"
      :maxlength="WORD_SIZE"
      autofocus
      type="text"
      @blur="({ target }) => (target as HTMLInputElement).focus()"
      @keydown.enter="onSubmit"
    />
  </div>
</template>
<style scoped>
input {
  position: absolute;
  opacity: 0;
}
</style>
