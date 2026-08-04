<script setup lang="ts">

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
  <p>You won!</p>
</div>

</template>
