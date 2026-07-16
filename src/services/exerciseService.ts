import { supabase } from '@/lib/supabase'
import type { MuscleGroup } from '@/types/workouts'

export async function getExercises() {
  const { data, error } = await supabase.from('exercises').select(`
      *,
      exercise_muscle_groups ( muscle_groups ( name) )
    `)

  if (error) {
    throw error
  }

  return (
    data?.map((exercise) => ({
      id: exercise.exercise_id,
      name: exercise.name,
      description: exercise.description ?? '',
      muscleGroups: exercise.exercise_muscle_groups.map(
        (exerciseMuscleGroup) => exerciseMuscleGroup.muscle_groups.name as MuscleGroup,
      ),
    })) ?? []
  )
}
