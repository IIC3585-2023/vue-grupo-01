<template>
  <template v-if="isLoggedIn && loadingUserInfo">
    <span class="loading loading-spinner loading-lg center" />
  </template>
  <template v-else-if="isLoggedIn && !loadingUserInfo">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
      <div>
        <h2 class="text-xl font-extrabold text-center mb-4">
          Following that aren't following me back ({{ followingThatArentFollowersBack.length }} / {{
            currentUserFollowing.length }})
        </h2>
        <ul class="flex flex-col gap-4">
          <UserElement
            v-for="user, index in followingThatArentFollowersBack"
            :key="index"
            v-bind="user"
            :is-follower="false"
            :current-user-followers="currentUserFollowers"
            :current-user-following="currentUserFollowing"
          />
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-extrabold text-center mb-4">
          Followers that I'm not following back ({{ followersThatArentFollowingBack.length }} / {{
            currentUserFollowers.length }})
        </h2>
        <ul class="flex flex-col gap-4">
          <UserElement
            v-for="user, index in followersThatArentFollowingBack"
            :key="index"
            v-bind="user"
            :is-follower="true"
            :current-user-followers="currentUserFollowers"
            :current-user-following="currentUserFollowing"
          />
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">
            GitHub Missing Followers: {{ count }}
          </h1>
          <div class="flex justify-center">
            <img src="/logo.png" alt="" class="rounded-lg w-32 py-4 invert">
          </div>
          <button class="btn btn-primary" @click="increment">
            +1 to counter
          </button>
          <p class="py-6">
            You can now check your missing followers and following on GitHub
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { User } from '~/composables/types'
import { useCurrentUserStore } from '~/stores/currentUser'

const currentUserStore = useCurrentUserStore()

const { isLoggedIn } = useAuth()

const followersThatArentFollowingBack = computed(() => currentUserStore.followersThatYouArentFollowingBack)
const followingThatArentFollowersBack = computed(() => currentUserStore.followingThatArentFollowersBack)
const currentUserFollowing = computed(() => currentUserStore.following)
const currentUserFollowers = computed(() => currentUserStore.followers)
const loadingUserInfo = computed(() => currentUserStore.loadingUserInfo)

const count = ref<number>(0)

const increment = () => {
  count.value++
}

</script>

<style scoped>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>
