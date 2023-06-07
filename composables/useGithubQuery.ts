import type { NuxtApp } from 'nuxt/app'
import { callWithNuxt } from 'nuxt/app'

export default async function <T> (app: NuxtApp, query: any, variables: Record<string, string | number>) {
  return await callWithNuxt(
    app,
    () => useAsyncQuery<T>(query, variables)
  )
}
