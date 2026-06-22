<script setup lang="ts">
import { exercises } from '@/data/exercises'
import type { Exercise, Workout } from '@/types/workouts'
import { computed } from 'vue'
import Chip from './Chip.vue'

const { workout } = defineProps<{
  workout: Workout
}>()
</script>

<template>
  <div class="card">
    <h4>{{ workout.name }}</h4>
    <div class="workoutDetails">
      <p>{{ workout.description }}</p>
      <p>{{ workout.exerciseIds.length }} exercises</p>
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
