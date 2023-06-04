<template>
  <span
    v-if="loading"
    class="loading loading-spinner loading-lg"
  />
  <ul
    v-else
    class="flex flex-col gap-4"
  >
    <li
      v-for="user, index in following"
      :key="index"
      class="flex flex-row justify-between gap-4"
    >
      <div class="flex flex-row gap-4">
        <img :src="user.avatarUrl" :alt="user.name ?? user.login" class="h-16 w-16 aspect-ratio-square items-center rounded-full">
        <div>
          <a
            :href="`https://github.com/${user.login}`"
            target="_blank"
            rel="noopener noreferrer"
            class="h-fit text-2xl font-bold"
          >{{ user.name ?? "@" + user.login }}</a>
          <div class="flex flex-col">
            <span class="text-gray-500">{{ user.following.totalCount }} following</span>
            <span class="text-gray-500">{{ user.followers.totalCount }} followers</span>
          </div>
        </div>
      </div>
      <button class="btn btn-green" @click="sexo">
        Show they follor back?
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { User } from '~/composables/types'

const loading = ref<boolean>(true)
const followers = ref<User[]>([])
const following = ref<User[]>([])

onMounted(() => {
  useUserInfo()
    .then(({ followers: followersResult, following: followingResult }) => {
      followers.value = followersResult
      following.value = followingResult
    })
    .finally(() => {
      loading.value = false
    })
})

const sexo = () => {
  // eslint-disable-next-line no-console
  console.log('SEXO')
}
</script>
