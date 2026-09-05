import type { Exercise, MuscleGroup, Workout, WorkoutSession } from '@/types/workouts'

export function mapExercise(row: {
  exercise_id: number
  name: string
  description: string | null
  exercise_muscle_groups: { muscle_groups: { name: string } }[]
}): Exercise {
  return {
    id: row.exercise_id,
    name: row.name,
    description: row.description ?? '',
    muscleGroups: row.exercise_muscle_groups.map(
      (exerciseMuscleGroup) => exerciseMuscleGroup.muscle_groups.name as MuscleGroup,
    ),
  }
}

export function mapWorkout(row: {
  workout_id: number
  name: string
  description: string | null
  workout_exercises: {
    order_index: number
    exercises: {
      exercise_id: number
      name: string
      description: string | null
      exercise_muscle_groups: { muscle_groups: { name: string } }[]
    }
  }[]
}): Workout {
  return {
    id: row.workout_id,
    name: row.name,
    description: row.description ?? undefined,
    workoutExercises: row.workout_exercises
      .map((workoutExercise) => ({
        ...mapExercise(workoutExercise.exercises),
        orderIndex: workoutExercise.order_index,
      }))
      .sort((first, second) => first.orderIndex - second.orderIndex),
  }
}

export function mapWorkoutSession(row: {
  workout_session_id: number
  workout_id: number
  workout_name: string
  performed_at: string
  performed_exercises: {
    exercise_id: number
    exercise_name: string
    set_info: string
  }[]
}): WorkoutSession {
  return {
    id: row.workout_session_id,
    workoutId: row.workout_id,
    workoutName: row.workout_name,
    performedAt: row.performed_at,
    exercises: row.performed_exercises.map((performedExercise) => ({
      exerciseId: performedExercise.exercise_id,
      exerciseName: performedExercise.exercise_name,
      setInfo: performedExercise.set_info,
    })),
  }
}
