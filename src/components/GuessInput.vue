<script lang="ts" setup>
import { WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { computed, ref, triggerRef } from 'vue'
import GuessView from '@/components/GuessView.vue'

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })

const guessInProgress = ref<string | null>(null)
const hasFailedValidation = ref<boolean>(false)
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
    hasFailedValidation.value = true
    setTimeout(() => {
      hasFailedValidation.value = false
    }, 500)
    return
  }
  emit('guess-submitted', formattedGuessInProgress.value)
  guessInProgress.value = null
}
</script>

<template>
  <div>
    <GuessView
      v-if="!disabled"
      :class="{ shake: hasFailedValidation }"
      :guess="formattedGuessInProgress"
    />
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
.shake {
  animation: shake;
  animation-duration: 100ms;
  animation-iteration-count: 2;
}
@keyframes shake {
  0% {
    transform: translateX(-2%);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2%);
  }
  75% {
    transform: translateX(0);
  }
}
</style>
