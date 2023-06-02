export default function useAuth() {
  const { VERCEL_URL: redirectUri, GITHUB_CLIENT_ID: clientId } = useRuntimeConfig().public
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.append('client_id', clientId)
  authUrl.searchParams.append('redirect_uri', redirectUri)

  const token = useCookie('gh_token')

  /** Computed value to know if the user is logged in */
  const isLoggedIn = computed<boolean>(() => {
    return !!token.value
  })

  /** Logout the user */
  const logout = () => {
    token.value = null
  }

  return {
    authUrl: authUrl.toString(),
    isLoggedIn,
    token,
    logout,
  }
}
