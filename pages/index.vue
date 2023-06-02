<template>
  <div class="p-4 flex gap-4">
    <button class="btn">
      Hello daisyUI
    </button>
  </div>
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Counter: {{ count }}
        </h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button
          class="btn btn-primary"
          @click="increment"
        >
          +1 to counter
        </button>
      </div>
    </div>
  </div>
  <div class="p-10">
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes"></figure>
      <div class="card-body">
        <h2 class="card-title">
          Log in with GitHub
        </h2>
        <div class="card-actions justify-end">
          <NuxtLink
            class="btn btn-primary"
            :to="authUrl"
          >
            Log in
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { GITHUB_REDIRECT_URI, GITHUB_CLIENT_ID } = useRuntimeConfig()

const authUrl = `
  https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}
`

const count = ref<number>(0)

const increment = () => {
  count.value++
}
</script>
