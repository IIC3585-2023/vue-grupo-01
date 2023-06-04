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
        <h2 class="text-xl font-extrabold">Following that aren't following back</h2>
        <ul class="flex flex-col gap-4">
          <VueUserElementComponent 
            v-for="following in followingThatArentFollowersBack" v-bind="following" isFollower="false"
          />
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-extrabold">Followers that you aren't following back</h2>
        <ul class="flex flex-col gap-4">
          <VueUserElementComponent v-for="follower in followersThatArentFollowingBack" v-bind="follower" isFollower="true" />
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
    SEXOOOOOO
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useAuth from '~/composables/useAuth'

const { isLoggedIn, token } = useAuth()

const followers = ref<any[]>([])
const following = ref<any[]>([])
const followersThatArentFollowingBack = computed(() => {
  return followers.value.filter(follower => !following.value.some(following => following.login === follower.login))
})

const followingThatArentFollowersBack = computed(() => {
  return following.value.filter(following => !followers.value.some(follower => follower.login === following.login))
})

watch(token, async (tokenValue) => {
  if (!tokenValue) { return }

  const query = gql`
  query {
    viewer {
      login
      followers(first: 100) {
        totalCount
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
      following(first: 100) {
        totalCount
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
  }
  `

  const { data, pending } = await useAsyncQuery(query)
  // followers.value.sort((a, b) => a.login.localeCompare(b.login))
  // following.value.sort((a, b) => a.login.localeCompare(b.login))
  followers.value = data.value.viewer.followers.edges.map((edge: any) => edge.node).sort((a, b) => a.following.totalCount - b.following.totalCount)
  following.value = data.value.viewer.following.edges.map((edge: any) => edge.node).sort((a, b) => a.followers.totalCount - b.followers.totalCount)

}, { immediate: true })

const count = ref<number>(0)

const increment = () => {
  count.value++
}

</script>
