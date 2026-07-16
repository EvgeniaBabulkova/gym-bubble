import type { WorkoutSession } from '@/types/workouts'
import { ref } from 'vue'

const workoutSessionsMock: WorkoutSession[] = [
  {
    id: 1,
    workoutId: 1,
    workoutName: 'Lower Body',
    performedAt: '2026-07-08T14:37:21.123Z',
    exercises: [
      {
        exerciseId: 2,
        exerciseName: 'Leg Press',
        setInfo: '20, 30, 40',
      },
      {
        exerciseId: 3,
        exerciseName: 'Leg Curl',
        setInfo: '33, 46, 46',
      },
    ],
  },
]

export const workoutSessions = ref<WorkoutSession[]>(workoutSessionsMock)
