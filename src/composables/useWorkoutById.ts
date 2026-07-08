import { computed } from 'vue'
import { exercises } from '@/data/exercises'
import { workoutss } from '@/data/workouts'

export function useWorkoutById(workoutId: number) {
  const workout = computed(() => workoutss.value.find((item) => item.id === workoutId))

  const workoutExercises = computed(() =>
    exercises.filter((exercise) => workout.value?.exerciseIds.includes(exercise.id)),
  )

  return {
    workout,
    workoutExercises,
  }
}
