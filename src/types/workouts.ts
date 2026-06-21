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
  exercises: Exercise[]
}
