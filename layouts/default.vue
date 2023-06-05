<template>
  <nav class="navbar bg-base-100">
    <div class="navbar-start ml-4">
      <h1 class="font-bold text-lg">
        Missing followers
      </h1>
    </div>
    <div class="navbar-end flex gap-4">
      <NuxtLink
        v-if="!isLoggedIn"
        class="btn"
        :to="authUrl"
      >
        Log in
      </NuxtLink>
      <template v-else>
        <div v-if="userInfo" class="flex items-center gap-2">
          <img
            :src="userInfo.avatarUrl"
            class="rounded-full w-8 h-8"
          >
          <a
            :href="`https://github.com/${userInfo.login}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-base-content"
          >
            {{ userInfo.login }}
          </a>
        </div>
        <button
          class="btn btn-ghost"
          @click="logout"
        >
          Log out
        </button>
      </template>
    </div>
  </nav>
  <slot />
</template>

<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import { useCurrentUserStore } from '~/stores/currentUser'

const { authUrl, isLoggedIn, logout, token } = useAuth()
const currentUserStore = useCurrentUserStore()
const userInfo = ref(null)

watch(token, async (tokenValue) => {
  if (!tokenValue) { return }
  await currentUserStore.getUserInfo()
  userInfo.value = currentUserStore.info
}, { immediate: true })

</script>
