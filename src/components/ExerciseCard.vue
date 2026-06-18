<script setup lang="ts">
import type { Exercise } from '@/types/exercises'
import Chip from './Chip.vue'

const { exercise } = defineProps<{
  exercise: Exercise
}>()
</script>

<template>
  <div class="card">
    <h4>{{ exercise.name }}</h4>
    <ul>
      <li v-for="group in exercise.muscleGroups"><Chip :text="group" /></li>
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

ul {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
