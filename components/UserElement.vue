<template>
  <li class="flex flex-row justify-between items-center gap-4 bg-base-200 border-base-300 border rounded-lg overflow-clip">
    <div class="flex flex-row gap-4 items-center flex-shrink">
      <img :src="avatarUrl" :alt="name ?? login" class="aspect-ratio-square h-24 items-center">
      <div class="flex-shrink truncate">
        <a
          :href="`https://github.com/${login}`"
          target="_blank"
          rel="noopener noreferrer"
          class="h-fit text-xl font-bold"
        >
          {{ name ?? "@" + login }}
        </a>
        <div class="flex flex-col">
          <span class="text-gray-500">{{ following.totalCount }} following</span>
          <span class="text-gray-500">{{ followers.totalCount }} followers</span>
        </div>
      </div>
    </div>
    <button
      class="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-32 flex-shrink-0 h-fit mr-4"
      @click="getDetail"
    >
      <p v-if="!loading">
        Should Follow Back?
      </p>
      <span v-else class="loading loading-dots loading-md" />
    </button>
    <UsersModal
      v-if="showDialog"
      :show-dialog="showDialog"
      @close="showDialog = false"
    >
      <div class="mb-4 text-center">
        <span class="font-bold">
          {{ formatAsPercentage(value) }}
        </span>
        of the people they follow, follow you
      </div>
      <ul class="flex flex-col gap-2">
        <li v-for="user, index in intersection" :key="index" class="flex gap-2 rounded border border-base-300 overflow-hidden">
          <img :src="user.avatarUrl" :alt="user.login" class="aspect-ratio-square h-16">
          <div class="px-2 flex items-center">
            {{ user.login }}
          </div>
        </li>
      </ul>
    </UsersModal>
  </li>
</template>

<script setup lang="ts">
import type { Followers, Following, User } from '~/composables/types'

const formatAsPercentage = Intl.NumberFormat('en-US', { style: 'percent' }).format

const props = defineProps<{
  login: string
  name: string | null
  avatarUrl: string
  following: Followers // { totalCount: number }
  followers: Following // { totalCount: number }
  currentUserFollowers: User[]
  currentUserFollowing: User[]
  isFollower: boolean
}>()

const showDialog = ref(false)
const followingSex = ref<Following[]>([])
const followersSex = ref<Followers[]>([])
const loading = ref(false)

const intersection = ref<any>([])
const value = ref(0)
// const intersection1 = computed(() => getIntersection(props.currentUserFollowers, followingSex.value.edges))
// const intersection2 = computed(() => getIntersection(props.currentUserFollowing, followersSex.value.edges))

const getDetail = async () => {
  loading.value = true
  const login = props.login
  const { data } = await useAsyncQuery(userQuery, { login, first: 100 })
  loading.value = false
  showDialog.value = true

  followingSex.value = data.value.user.following
  followersSex.value = data.value.user.followers

  if (!props.isFollower) {
    intersection.value = getIntersection(props.currentUserFollowers, followingSex.value.edges)
    value.value = intersection.value.length / props.following.totalCount
  } else {
    intersection.value = getIntersection(props.currentUserFollowing, followersSex.value.edges)
    value.value = intersection.value.length / props.followers.totalCount
  }
  console.log('intersection', intersection.value)
  // console.log('followingSex', followingSex.value)
  // console.log('followersSex', followersSex.value)
}

const getIntersection = (f1: any, f2: any) => {
  // console.log('f1', f1)
  // console.log('f2', f2)
  const usersInCommon = []
  for (const user1 of f1) {
    for (const user2 of f2) {
      if (user1.login === user2.node.login) {
        usersInCommon.push(user1)
      }
    }
  }
  return usersInCommon
}

</script>
