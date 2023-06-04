function buildAuthURL () {
  const { VERCEL_URL: redirectUri, GITHUB_CLIENT_ID: clientId } = useRuntimeConfig().public

  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.append('client_id', clientId)
  authUrl.searchParams.append('redirect_uri', redirectUri)

  return authUrl.toString()
}

export default function useAuth () {
  const token = useStatefulCookie('gh_token')

  const logout = () => token.value = null

  return {
    authUrl: buildAuthURL(),
    isLoggedIn: computed(() => !!token.value),
    token,
    logout,
  }
}
