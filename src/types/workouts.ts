// workouts -------------------------------------------

type MovementType = 'Compound' | 'Accessory' | 'Isolation'

type Equipment =
  | 'Barbell'
  | 'Dumbbells'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight'
  | 'Resistance Band'
  | 'Smith Machine'

export type Exercise = {
  id: number
  name: string
  muscleGroups: string[]
  description: string
  // movementType: MovementType
  // equipment: Equipment
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

// workout sessions -------------------------------------

type PerformedExercises = {
  exerciseId: number
  exerciseName: string
  setNotes: string
}

export type WorkoutSession = {
  id: number
  workoutId: number
  workoutName: string
  performedAt: string
  exercises: PerformedExercises[]
}
