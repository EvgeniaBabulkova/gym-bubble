<script setup lang="ts">
import type { Exercise } from '@/types/workouts.ts'
import Chip from './UI/Chip.vue'

const { exercise } = defineProps<{
  exercise: Exercise
}>()
</script>

<template>
  <div class="card">
    <p>{{ exercise.name }}</p>
    <ul>
      <li v-for="group in exercise.muscleGroups"><Chip :label="group" /></li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--col-surface-secondary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  gap: var(--spacing-md);
}

p {
  font: var(--font-body-1);
}

ul {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
