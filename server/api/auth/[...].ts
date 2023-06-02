const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = useRuntimeConfig()

interface Response {
  access_token: string,
  scope: string,
  token_type: string
}

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event)
  if (!code) {
    return sendRedirect(event, '/')
  }
  try {
    const response = await $fetch<Response>(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        body: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code
        }
      }
    )
    setCookie(event, 'gh_token', response.access_token, { path: '/' })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return sendRedirect(event, '/')
})
