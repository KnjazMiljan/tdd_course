<script setup lang="ts">

import {VICTORY_MESSAGE} from "@/settings";
const props = defineProps({
  wordOfTheDay: {
    type: String,
    default: ''
  }
})
</script>

<template>
<div>
  <input type="text">
  <p>{{ VICTORY_MESSAGE }}</p>
  <p>Better luck next time!</p>
</div>

</template>
