<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const members = ref<string[]>([
  'Benja Vicente',
  'Jose Antonio Castro',
  'José Madriaza'
])

onMounted(() => {
  members.value.forEach((member: string) => {
    console.log(member)
  })
})
</script>
