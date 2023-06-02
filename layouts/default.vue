<template>
  <nav class="navbar bg-base-100">
    <div class="navbar-start">
      <NuxtLink
        class="btn btn-ghost normal-case text-xl"
        to="/"
      >
        Home
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <NuxtLink
        v-if="!isLoggedIn"
        class="btn"
        :to="authUrl"
      >
        Log in
      </NuxtLink>
      <button
        v-else
        class="btn btn-ghost"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </nav>
  <slot />
</template>

<script setup lang="ts">
import useAuth from '~/composables/useAuth'

const { GITHUB_REDIRECT_URI, GITHUB_CLIENT_ID } = useRuntimeConfig().public

const { authUrl, isLoggedIn, logout } = useAuth(GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI)
</script>
