export type Exercise = {
  id: number
  name: string
  muscleGroups: string[]
  description: string
}

// workout ---------------------

export type WorkoutExercise = {
  exerciseId: number // use this id to target the Exercise for the rest of the details many-to-many
  order: number
}

export type Workout = {
  id: number
  name: string
  description?: string
  exercises: WorkoutExercise[]
}
