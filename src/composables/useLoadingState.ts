import { ref } from 'vue'

export function useLoadingState() {
  const isLoading = ref(false)
  const hasLoaded = ref(false)
  const error = ref<string | null>(null)

  return {
    isLoading,
    hasLoaded,
    error,
  }
}
