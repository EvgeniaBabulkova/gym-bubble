<script setup lang="ts">
import ExerciseCard from '@/components/ExerciseCard.vue'
import { exercises } from '@/data/exercises'
</script>

<template>
  <div class="exercisesContainer">
    <h2>Starting with the exercises list:</h2>
    <ul class="exercisesList">
      <li v-for="exercise in exercises">
        <ExerciseCard :exercise="exercise" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.exercisesContainer {
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: var(--spacing-lg);
}

.exercisesList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
