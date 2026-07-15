import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { WorkoutSession } from '@/types/workouts'
import { getWorkoutSessions } from '@/services/workoutSessionService'

export const useWorkoutSessionsStore = defineStore('workoutSessions', () => {
  // state
  const workoutSessions = ref<WorkoutSession[]>([])
  const isLoading = ref(false)
  const loadingError = ref<string | null>(null)
  const hasLoaded = ref(false)

  // getters
  const totalSessionCount = computed(() => workoutSessions.value.length) // todo: make it per month

  // actions
  function addWorkoutSession(workoutSession: WorkoutSession) {
    workoutSessions.value.push(workoutSession)
  }

  function removeWorkoutSession(workoutSessionId: number) {
    workoutSessions.value = workoutSessions.value.filter(
      (workoutSession) => workoutSession.id !== workoutSessionId,
    )
  }

  function getSessionsByWorkoutId(workoutId: number) {
    return workoutSessions.value.filter((workoutSession) => workoutSession.workoutId === workoutId)
  }

  // todo: explore integrating tanstack query

  async function fetchWorkoutSessions() {
    if (hasLoaded.value || isLoading.value) {
      return
    } // this check prevents fetches if the data has already been fetched

    isLoading.value = true
    loadingError.value = null

    try {
      workoutSessions.value = await getWorkoutSessions()
      hasLoaded.value = true
    } catch (error) {
      loadingError.value =
        error instanceof Error ? error.message : 'Workout sessions could not be loadeeed'
    } finally {
      isLoading.value = false
    }
  }

  return {
    workoutSessions,
    totalSessionCount,
    addWorkoutSession,
    removeWorkoutSession,
    getSessionsByWorkoutId,
    fetchWorkoutSessions,
  }
})
