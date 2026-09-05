import { supabase } from '@/lib/supabase'
import { mapExercise } from '@/utils/mappers'

export async function getExercises() {
  const { data, error } = await supabase.from('exercises').select(`
      *,
      exercise_muscle_groups ( muscle_groups ( name) )
    `)

  if (error) {
    throw error
  }

  return data?.map(mapExercise) ?? []
}
