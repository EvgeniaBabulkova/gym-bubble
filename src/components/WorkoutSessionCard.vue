<script setup lang="ts">
import type { WorkoutSession } from '@/types/workouts'

const { workoutSession } = defineProps<{
  workoutSession: WorkoutSession
}>()
</script>

<template>
  <!-- <RouterLink class="card" :to="{ name: 'workout-details', params: { workoutId: workout.id } }"> -->
  <div class="card">
    <h4>{{ workoutSession.workoutName }}</h4>
    <div class="workoutDetails">
      <!-- todo: add description to the workout session object -->
      <p>{{ new Date(workoutSession.performedAt).toLocaleString() }}</p>
      <p>Did: {{ workoutSession.exercises.length }} exercises</p>
    </div>
  </div>
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
