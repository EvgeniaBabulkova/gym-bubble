import type { Workout } from '@/types/workouts'

export const workouts: Workout[] = [
  {
    id: 1,
    name: 'Lower Body',
    description: 'Glutes, quads and hamstrings.',
    exercises: [
      {
        id: 1,
        name: 'Bulgarian Split Squat',
        muscleGroups: ['Glutes', 'Quadriceps', 'Adductors'],
        description:
          'Place rear foot on a bench, keep chest upright, lower until front thigh is near parallel, then drive through the front foot.',
      },
      {
        id: 2,
        name: 'Leg Press',
        muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
        description:
          'Keep feet shoulder-width apart on the platform, lower under control, and press without locking the knees.',
      },
      {
        id: 3,
        name: 'Leg Curl',
        muscleGroups: ['Hamstrings'],
        description:
          'Keep hips stable against the pad, curl the weight toward you, and lower slowly.',
      },
      {
        id: 4,
        name: 'Hip Abduction Machine',
        muscleGroups: ['Gluteus Medius', 'Gluteus Minimus'],
        description:
          'Sit upright, push knees outward under control, pause briefly, and return slowly.',
      },
    ],
  },
  {
    id: 2,
    name: 'Upper Body',
    description: 'Back and shoulders.',
    exercises: [
      {
        id: 6,
        name: 'Assisted Pull-Up',
        muscleGroups: ['Latissimus Dorsi', 'Biceps', 'Upper Back'],
        description:
          'Keep shoulders down and back, pull chest toward the bar, and lower under control.',
      },
      {
        id: 8,
        name: 'Lat Pulldown',
        muscleGroups: ['Latissimus Dorsi', 'Biceps'],
        description:
          'Pull the bar toward the upper chest while keeping the torso stable and shoulders down.',
      },
      {
        id: 7,
        name: 'Seated Row Machine',
        muscleGroups: ['Upper Back', 'Latissimus Dorsi', 'Rear Deltoids'],
        description:
          'Keep chest up, pull handles toward your torso, squeeze shoulder blades together, then return slowly.',
      },
      {
        id: 9,
        name: 'Cable Face Pull',
        muscleGroups: ['Rear Deltoids', 'Upper Back', 'Rotator Cuff'],
        description:
          'Pull the rope toward eye level, flare elbows outward, and squeeze the upper back.',
      },
    ],
  },
  {
    id: 3,
    name: 'Mobility & Recovery',
    description: 'Light recovery session.',
    exercises: [
      {
        id: 4,
        name: 'Hip Abduction Machine',
        muscleGroups: ['Gluteus Medius', 'Gluteus Minimus'],
        description:
          'Sit upright, push knees outward under control, pause briefly, and return slowly.',
      },
      {
        id: 5,
        name: 'Hip Adduction Machine',
        muscleGroups: ['Adductors'],
        description:
          'Sit upright, bring knees together in a controlled motion, then return slowly.',
      },
    ],
  },
]
