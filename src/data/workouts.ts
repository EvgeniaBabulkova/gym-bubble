import type { Workout } from '@/types/workouts'
import { ref } from 'vue'
import { workoutsMock } from './workouts-mock'

export const workoutss = ref<Workout[]>(workoutsMock)
