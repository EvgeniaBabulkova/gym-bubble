<script setup lang="ts">
import { exercises } from '@/data/exercises'
import { workoutss } from '@/data/workouts'
import type { Workout } from '@/types/workouts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// get the route - get the param of id from it - use that id to get the workout data
const route = useRoute()
const workoutId = computed(() => Number(route.params.workoutId))

const workout = computed(() => workoutss.value.find((workout) => workout.id === workoutId.value))
// keep only exercises whose ids live in the current workout
const workoutExercises = computed(() =>
  exercises.filter((exercise) => workout.value?.exerciseIds.includes(exercise.id)),
)
</script>

<template>
  <section v-if="workout">
    <h3>{{ workout.name }}</h3>
    <p>{{ workout.description }}</p>
    <ul>
      <li v-for="exercise in workoutExercises">{{ exercise.name }}</li>
    </ul>
  </section>

  <p v-else>This workout couldd not be found!</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}
</style>
