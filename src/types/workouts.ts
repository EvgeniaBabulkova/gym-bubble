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

export type MuscleGroup =
  | 'Chest'
  | 'Front Shoulders'
  | 'Side Shoulders'
  | 'Rear Shoulders'
  | 'Triceps'
  | 'Biceps'
  | 'Forearms'
  | 'Lats'
  | 'Upper Back'
  | 'Lower Back'
  | 'Abs'
  | 'Glutes'
  | 'Quadriceps'
  | 'Hamstrings'
  | 'Calves'

export type Exercise = {
  id: number
  name: string
  muscleGroups: MuscleGroup[]
  description: string
  // movementType: MovementType
  // equipment: Equipment
}

export type WorkoutExercise = Exercise & {
  orderIndex: number
}

export type Workout = {
  id: number
  name: string
  description?: string
  workoutExercises: WorkoutExercise[]
}

export type CreateWorkoutInput = {
  name: string
  description: string
  exerciseIds: number[] // only ids
}

// workout sessions -------------------------------------

export type PerformedExercise = {
  exerciseId: number
  exerciseName: string
  setInfo: string
}

export type CreateWorkoutSessionInput = {
  workoutId: number
  performedAt: string
  exercises: {
    exerciseId: number
    setInfo: string
  }[]
}

export type WorkoutSession = {
  id: number
  workoutId: number
  workoutName: string
  performedAt: string
  exercises: PerformedExercise[]
}
