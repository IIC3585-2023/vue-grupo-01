<template>
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="user, index in array" :key="index">
        <th>{{ index }}</th>
        <td>{{ user.name }}</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User } from '~/composables/types'
defineProps<{
  users: User[]
}>()
</script>
