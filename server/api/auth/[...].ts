import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SECRET } = useRuntimeConfig()

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ]
})
