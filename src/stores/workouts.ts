import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createWorkout, getWorkouts } from '../services/workoutService'
import type { CreateWorkoutInput, Workout } from '@/types/workouts'
import { useLoadingState } from '@/composables/useLoadingState'

export const useWorkoutStore = defineStore('workouts', () => {
  const workouts = ref<Workout[]>([])
  const { isLoading, hasLoaded, error } = useLoadingState()

  // fetch workouts
  async function fetchWorkouts() {
    if (hasLoaded.value || isLoading.value) return
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

  // create new workout
  async function createNewWorkout(workoutInput: CreateWorkoutInput) {
    isLoading.value = true
    error.value = null

    try {
      const createdWorkout = await createWorkout(workoutInput)
      workouts.value.unshift(createdWorkout)
    } catch (postError) {
      error.value = postError instanceof Error ? postError.message : 'Failed to create workooout.'
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
    createNewWorkout,
  }
})
