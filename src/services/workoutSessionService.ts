import { supabase } from '@/lib/supabase'
import { mapWorkoutSession } from '@/utils/mappers'
import type { CreateWorkoutSessionInput, WorkoutSession } from '@/types/workouts'

export async function getWorkoutSessions() {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*, performed_exercises (*)')
    .order('performed_at', { ascending: false })

  if (error) {
    throw error
  }

  return data?.map(mapWorkoutSession) ?? []
}

export async function getWorkoutSessionById(workoutSessionId: number) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*, performed_exercises (*)')
    .eq('workout_session_id', workoutSessionId)
    .single()

  if (error) throw error
  return mapWorkoutSession(data)
}

export async function createWorkoutSession(
  workoutSessionInput: CreateWorkoutSessionInput,
): Promise<WorkoutSession> {
  const { data: sessionId, error } = await supabase.rpc('create_workout_session', {
    p_workout_id: workoutSessionInput.workoutId,
    p_performed_at: workoutSessionInput.performedAt,
    p_exercises: workoutSessionInput.exercises.map((exercise) => ({
      exercise_id: exercise.exerciseId,
      set_info: exercise.setInfo,
    })),
  })

  if (error) throw error
  return getWorkoutSessionById(sessionId)
}
