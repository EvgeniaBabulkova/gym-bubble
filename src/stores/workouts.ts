import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getWorkouts } from '../services/workoutService'
import type { Workout } from '@/types/workouts'

export const useWorkoutStore = defineStore('workouts', () => {
  const workouts = ref<Workout[]>([])

  const isLoading = ref(false)
  const hasLoaded = ref(false)
  const error = ref<string | null>(null)

  async function fetchWorkouts() {
    if (hasLoaded.value || isLoading.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      workouts.value = await getWorkouts()
      hasLoaded.value = true
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : 'Failed to load workooouts.'
    } finally {
      isLoading.value = false
    }
  }

  function getWorkoutById(workoutId: number) {
    return workouts.value.find((workout) => workout.id === workoutId)
  }

  return {
    workouts,
    isLoading,
    hasLoaded,
    error,
    fetchWorkouts,
    getWorkoutById,
  }
})
