import { supabase } from '@/lib/supabase'

export async function getWorkoutSessions() {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
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

      // i'll populate this later..
      exercises: [],
    })) ?? []
  )
}
