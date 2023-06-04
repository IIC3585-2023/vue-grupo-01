import { watch } from 'vue'
import { CookieOptions, CookieRef } from '#app'
import { useCookie, useState } from '#imports'

export default function useStatefulCookie<T = string | null> (
  name: string,
  options?: CookieOptions<T>,
): CookieRef<T> {
  const cookie = useCookie(name, options)
  const state = useState(name, () => cookie.value)

  watch(state, value => (cookie.value = value))

  return state
}
