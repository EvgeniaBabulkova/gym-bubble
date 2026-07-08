export type Exercise = {
  id: number
  name: string
  muscleGroups: string[]
  description: string
}

export type Workout = {
  id: number
  name: string
  description?: string
  exerciseIds: number[]
}

export type CreateWorkoutInput = {
  name: string
  description: string
  exerciseIds: number[] // only ids
}

export type WorkoutSession = {
  id: number
  workoutId: number
  performedAt: string
  exercises: {
    exerciseId: number
    exerciseName: string
    setNotes: string
  }[]
}
