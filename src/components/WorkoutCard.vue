<script setup lang="ts">
import type { Workout } from '@/types/workouts'

const { workout } = defineProps<{
  workout: Workout
}>()
</script>

<template>
  <RouterLink class="card" :to="{ name: 'workout-details', params: { workoutId: workout.id } }">
    <h4>{{ workout.name }}</h4>
    <div class="workoutDetails">
      <p>{{ workout.description }}</p>
      <p>{{ workout.workoutExercises.length }} exercises</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--col-surface-tertiary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  gap: var(--spacing-md);
}

ul {
  display: flex;
  gap: var(--spacing-xs);
}

.workoutDetails {
  display: flex;
  justify-content: space-between;
}
</style>
