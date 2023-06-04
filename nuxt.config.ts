// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/apollo'],
  runtimeConfig: {
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    public: {
      VERCEL_URL: `http://${process.env.VERCEL_URL}/api/auth/callback`,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  },
  eslint: {
    lintOnStart: false,
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.github.com/graphql',
        tokenName: 'gh_token',
      }
    },
  },
})
