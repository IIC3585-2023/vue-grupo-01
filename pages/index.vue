<template>
  <template v-if="isLoggedIn">
    SEXO
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">
            Counter: {{ count }}
          </h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti
            eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary" @click="increment">
            +1 to counter
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="">
        <h2 class="text-xl font-extrabold">
          Following that aren't following back
        </h2>
        <ul class="flex flex-col gap-4">
          <UserElement
            v-for="user, index in followingThatArentFollowersBack"
            :key="index"
            v-bind="user"
          />
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-extrabold">
          Followers that you aren't following back
        </h2>
        <ul class="flex flex-col gap-4">
          <UserElement
            v-for="user, index in followersThatArentFollowingBack"
            :key="index"
            v-bind="user"
          />
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
    SEXOOOOOO
  </template>
</template>

<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import type { User } from '~/composables/types'

const { isLoggedIn, token } = useAuth()

const followers = ref<User[]>([])
const following = ref<User[]>([])

const followersThatArentFollowingBack = computed(() => {
  return followers.value.filter(follower => !following.value.some(following => following.login === follower.login))
})
const followingThatArentFollowersBack = computed(() => {
  return following.value.filter(following => !followers.value.some(follower => follower.login === following.login))
})

watch(token, async (tokenValue) => {
  if (!tokenValue) { return }
  const { followers: followersResult, following: followingResult } = await useUserInfo()
  followers.value = followersResult
  following.value = followingResult
}, { immediate: true })

const count = ref<number>(0)

const increment = () => {
  count.value++
}

</script>
