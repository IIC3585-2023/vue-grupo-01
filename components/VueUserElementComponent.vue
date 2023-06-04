<template>
  <li class="flex flex-row justify-between gap-4">
    <div class="flex flex-row gap-4">
      <img :src="avatarUrl" :alt="name ?? login" class="h-16 w-16 aspect-ratio-square items-center rounded-full">
      <div>
        <a :href="`https://github.com/${login}`" target="_blank" rel="noopener noreferrer"
          class="h-fit text-2xl font-bold">{{ name ?? "@" + login }}</a>
        <div class="flex flex-col">
          <span class="text-gray-500">{{ following.totalCount }} following</span>
          <span class="text-gray-500">{{ followers.totalCount }} followers</span>
        </div>
      </div>
    </div>
    <button class="btn btn-green" @click=sexo>Show they follor back?</button>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  login: string
  name?: string
  avatarUrl: string
  following: { totalCount: number }
  followers: { totalCount: number }
  isFollowing: boolean
}>()

async function sexo() {
  const login = props.login

  const following = ref<any[]>([])
  const query = gql`
  query {
    user(login: ${login}) {
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
  console.log(data, pending)
  following.value = data.value.user.following.edges.map((edge: any) => edge.node).sort((a, b) => a.login.localeCompare(b.login))
  console.log(following.value)
}
</script>
