<template>
  <li
    class="flex flex-row justify-between gap-4"
  >
    <div class="flex flex-row gap-4">
      <img :src="avatarUrl" :alt="name ?? login" class="h-16 w-16 aspect-ratio-square items-center rounded-full">
      <div>
        <a
          :href="`https://github.com/${login}`"
          target="_blank"
          rel="noopener noreferrer"
          class="h-fit text-2xl font-bold"
        >{{ name ?? "@" + login }}</a>
        <div class="flex flex-col">
          <span class="text-gray-500">{{ following.totalCount }} following</span>
          <span class="text-gray-500">{{ followers.totalCount }} followers</span>
        </div>
      </div>
    </div>
    <button class="btn btn-green" @click="sexo">
      Show they follor back?
    </button>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  login: string
  name: string | null
  avatarUrl: string
  following: { totalCount: number }
  followers: { totalCount: number }
}>()

const sexo = () => {
  // eslint-disable-next-line no-console
  console.log('sexo')
}
</script>
