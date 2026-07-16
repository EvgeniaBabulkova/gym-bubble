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

type WorkoutExrcise = {
  exercise: Exercise
  orderIndex: number
}

export type Workout = {
  id: number
  name: string
  description?: string
  exercises: WorkoutExrcise[]
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
