import { supabase } from '@/lib/supabase'
import { mapWorkout } from '@/utils/mappers'
import type { CreateWorkoutInput } from '@/types/workouts'

export async function getWorkouts() {
  const { data, error } = await supabase
    .from('workouts')
    .select(
      ` *,
      workout_exercises ( *, exercises ( *, exercise_muscle_groups ( muscle_groups ( name ))))`,
    )
    .order('workout_id', { ascending: false })
  if (error) throw error
  return data.map(mapWorkout)
}

export async function getWorkoutById(workoutId: number) {
  const { data, error } = await supabase
    .from('workouts')
    .select(
      `*, workout_exercises ( *, exercises ( *, exercise_muscle_groups (muscle_groups ( name ))))`,
    )
    .eq('workout_id', workoutId)
    .single()

  if (error) throw error
  return mapWorkout(data)
}

export async function createWorkout(workoutInput: CreateWorkoutInput) {
  const { data: createdWorkout, error: workoutError } = await supabase
    .from('workouts')
    .insert({
      user_id: 1,
      name: workoutInput.name,
      description: workoutInput.description || null,
    })
    .select()
    .single()

  if (workoutError) throw workoutError

  const workoutExercises = workoutInput.exerciseIds.map((exerciseId, orderIndex) => ({
    workout_id: createdWorkout.workout_id,
    exercise_id: exerciseId,
    order_index: orderIndex,
  }))

  const { error: workoutExercisesError } = await supabase
    .from('workout_exercises')
    .insert(workoutExercises)

  if (workoutExercisesError) throw workoutExercisesError
  // still doing 2 queries here - i could extract the mapping and just transform the data before sending it instead
  return await getWorkoutById(createdWorkout.workout_id)
}
