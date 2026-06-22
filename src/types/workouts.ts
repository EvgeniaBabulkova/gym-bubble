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

//for later
type WorkoutHistory = {
  id: string
  workoutId: string
  performedAt: string
  repsNotes: {
    exerciseId: number
    note: string
  }
}
