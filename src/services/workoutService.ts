import { supabase } from '@/lib/supabase'
import type { MuscleGroup } from '@/types/workouts'

export async function getWorkouts() {
  const { data, error } = await supabase.from('workouts').select(` *,
      workout_exercises ( *,
        exercises ( *, exercise_muscle_groups ( muscle_groups ( name ) ) )
      )
    `)
  if (error) {
    throw error
  }
  return (
    // todo: check PostgreSQL Views Strategy
    // todo: later extract mappings for reuse
    data.map((workout) => ({
      id: workout.workout_id,
      name: workout.name,
      description: workout.description ?? undefined,

      workoutExercises: workout.workout_exercises
        .map((workoutExercise) => ({
          id: workoutExercise.exercises.exercise_id,
          name: workoutExercise.exercises.name,
          description: workoutExercise.exercises.description ?? '',
          muscleGroups: workoutExercise.exercises.exercise_muscle_groups.map(
            (exerciseMuscleGroup) => exerciseMuscleGroup.muscle_groups.name as MuscleGroup,
          ),
          orderIndex: workoutExercise.order_index,
        }))
        .sort(
          (firstWorkoutExercise, secondWorkoutExercise) =>
            firstWorkoutExercise.orderIndex - secondWorkoutExercise.orderIndex,
        ),
    })) ?? []
  )
}
