import type { Workout } from '@/types/workouts'
import { ref } from 'vue'

const workoutsMock: Workout[] = [
  {
    id: 1,
    name: 'Lower Body',
    description: 'Glutes, quads and hamstrings.',
    exerciseIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: 'Upper Body',
    description: 'Back and shoulders.',
    exerciseIds: [6, 8, 7, 9],
  },
]

export const workoutss = ref<Workout[]>(workoutsMock)
