import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { WorkoutSession } from '@/types/workouts'
import { getWorkoutSessions } from '@/services/workoutSessionService'
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
  function addWorkoutSession(workoutSession: WorkoutSession) {
    workoutSessions.value.push(workoutSession)
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
    addWorkoutSession,
    removeWorkoutSession,
    getSessionsByWorkoutId,
  }
})
