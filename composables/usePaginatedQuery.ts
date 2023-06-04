export default function usePaginatedQuery<TData = any, TError = any> (
  query: DocumentNode,
) {
  results = ref<TData | null>([])
  const isLoading = ref(false)
  const after = ref(null)

  const execute = async () => {
    isLoading.value = true
    const { data } = await useAsyncQuery(query, {
      after: after.value,
    })
    results.value.push(...result.data)
    after.value = result.after
    isLoading.value = false
  }
}