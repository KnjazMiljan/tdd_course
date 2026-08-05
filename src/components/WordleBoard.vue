<script setup lang="ts">

import {VICTORY_MESSAGE, DEFEAT_MESSAGE} from "@/settings";

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
  <p>{{ DEFEAT_MESSAGE }}</p>
</div>

</template>
