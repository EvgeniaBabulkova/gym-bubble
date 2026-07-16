import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CreateWorkoutSessionInput, WorkoutSession } from '@/types/workouts'
import { createWorkoutSession, getWorkoutSessions } from '@/services/workoutSessionService'
import { useLoadingState } from '@/composables/useLoadingState'

// todo: explore integrating tanstack query
export const useWorkoutSessionsStore = defineStore('workoutSessions', () => {
  const workoutSessions = ref<WorkoutSession[]>([])
  const { isLoading, hasLoaded, error } = useLoadingState()

  const totalSessionCount = computed(() => workoutSessions.value.length) // todo: make it per month

  // fetchWorkoutSessions
  async function fetchWorkoutSessions() {
    if (hasLoaded.value || isLoading.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      workoutSessions.value = await getWorkoutSessions()
      hasLoaded.value = true
    } catch (fetchError) {
      error.value =
        fetchError instanceof Error ? fetchError.message : 'Workout sessions could not be loadeeed'
    } finally {
      isLoading.value = false
    }
  }

  // createWorkoutSession
  async function createNewWorkoutSession(workoutSessionInput: CreateWorkoutSessionInput) {
    isLoading.value = true
    error.value = null

    try {
      const createdWorkoutSession = await createWorkoutSession(workoutSessionInput)
      workoutSessions.value.unshift(createdWorkoutSession)
      return createdWorkoutSession
    } catch (postError) {
      error.value =
        postError instanceof Error ? postError.message : 'Failed to create workout session.'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // removeWorkoutSession
  function removeWorkoutSession(workoutSessionId: number) {
    workoutSessions.value = workoutSessions.value.filter(
      (workoutSession) => workoutSession.id !== workoutSessionId,
    )
  }

  // getSessionsByWorkoutId
  function getSessionsByWorkoutId(workoutId: number) {
    return workoutSessions.value.filter((workoutSession) => workoutSession.workoutId === workoutId)
  }

  return {
    fetchWorkoutSessions,
    workoutSessions,
    totalSessionCount,
    createNewWorkoutSession,
    removeWorkoutSession,
    getSessionsByWorkoutId,
  }
})
