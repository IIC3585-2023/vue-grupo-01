// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/apollo'],
  runtimeConfig: {
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    public: {
      REDIRECT_URL: `https://${process.env.HOST ?? process.env.VERCEL_URL}/api/auth/callback`,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        REDIRECT_URL: 'http://localhost:3000/api/auth/callback',
      }
    }
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
