import type { Workout } from '@/types/workouts'

export const workouts: Workout[] = [
  {
    id: 1,
    name: 'Lower Body',
    description: 'Glutes, quads and hamstrings.',
    exercises: [
      { exerciseId: 1, order: 1 },
      { exerciseId: 2, order: 2 },
      { exerciseId: 3, order: 3 },
      { exerciseId: 4, order: 4 },
    ],
  },
  {
    id: 2,
    name: 'Upper Body',
    description: 'Back and shoulders.',
    exercises: [
      { exerciseId: 6, order: 1 },
      { exerciseId: 8, order: 2 },
      { exerciseId: 7, order: 3 },
      { exerciseId: 9, order: 4 },
    ],
  },
  {
    id: 3,
    name: 'Mobility & Recovery',
    description: 'Light recovery session.',
    exercises: [
      { exerciseId: 4, order: 1 },
      { exerciseId: 5, order: 2 },
    ],
  },
]
