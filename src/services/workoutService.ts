import { supabase } from '@/lib/supabase'
import type { CreateWorkoutInput, MuscleGroup } from '@/types/workouts'

export async function getWorkouts() {
  const { data, error } = await supabase.from('workouts').select(` *,
      workout_exercises ( *,
        exercises ( *, exercise_muscle_groups ( muscle_groups ( name ) ) )
      )
    `)
  if (error) throw error
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

export async function getWorkoutById(workoutId: number) {
  const { data, error } = await supabase
    .from('workouts')
    .select(
      `*, workout_exercises ( *, exercises ( *, exercise_muscle_groups (muscle_groups ( name ))))`,
    )
    .eq('workout_id', workoutId)
    .single()

  if (error) throw error
  return {
    id: data.workout_id,
    name: data.name,
    description: data.description ?? undefined,
    workoutExercises: data.workout_exercises
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
  }
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
