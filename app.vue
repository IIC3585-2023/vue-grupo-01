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
    // eslint-disable-next-line no-console
    console.log(member)
  })
})
</script>
