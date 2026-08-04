<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})
</script>

<template>

  <p>{{ props.msg }}</p>

</template>
