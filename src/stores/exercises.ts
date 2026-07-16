// bc i will later wanna search through exercises, filter
// them and display them in more than 1 place

import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getExercises } from '@/services/exerciseService'
import { useLoadingState } from '@/composables/useLoadingState'
import type { Exercise } from '@/types/workouts'

export const useExerciseStore = defineStore('exercises', () => {
  const exercises = ref<Exercise[]>([])
  const { isLoading, hasLoaded, error } = useLoadingState()

  async function fetchExercises() {
    if (hasLoaded.value || isLoading.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      exercises.value = await getExercises()
      hasLoaded.value = true
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : 'Failed to load exercises.'
    } finally {
      isLoading.value = false
    }
  }

  function getExerciseById(exerciseId: number) {
    return exercises.value.find((exercise) => exercise.id === exerciseId)
  }

  return {
    exercises,
    isLoading,
    hasLoaded,
    error,
    fetchExercises,
    getExerciseById,
  }
})
