import { supabase } from '@/lib/supabase'
import type { CreateWorkoutSessionInput, WorkoutSession } from '@/types/workouts'

export async function getWorkoutSessions() {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*, performed_exercises (*)')
    .order('performed_at', { ascending: false })

  if (error) {
    throw error
  }

  return (
    // since my backend is supabase instead of transforming
    // my data there, i do it here in the frontend...
    // todo: PostgreSQL Views Strategy
    data?.map((session) => ({
      id: session.workout_session_id,
      userId: session.user_id,
      workoutId: session.workout_id,
      workoutName: session.workout_name,
      performedAt: session.performed_at,
      exercises: session.performed_exercises.map((performedExercise) => ({
        exerciseId: performedExercise.exercise_id,
        exerciseName: performedExercise.exercise_name,
        setInfo: performedExercise.set_info,
      })),
    })) ?? []
  )
}

export async function createWorkoutSession(
  workoutSessionInput: CreateWorkoutSessionInput,
): Promise<WorkoutSession> {
  const { data: createdSession, error: sessionError } = await supabase
    .from('workout_sessions')
    .insert({
      user_id: 1,
      workout_id: workoutSessionInput.workoutId,
      workout_name: workoutSessionInput.workoutName,
      performed_at: workoutSessionInput.performedAt,
    })
    .select()
    .single()

  if (sessionError) throw sessionError

  const performedExercises = workoutSessionInput.exercises.map((performedExercise) => ({
    workout_session_id: createdSession.workout_session_id,
    exercise_id: performedExercise.exerciseId,
    exercise_name: performedExercise.exerciseName,
    set_info: performedExercise.setInfo,
  }))

  const { error: performedExercisesError } = await supabase
    .from('performed_exercises')
    .insert(performedExercises)

  if (performedExercisesError) throw performedExercisesError

  return {
    id: createdSession.workout_session_id,
    ...workoutSessionInput,
  }
}
