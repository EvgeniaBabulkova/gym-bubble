<script setup lang="ts">
import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { exercises } from '@/data/exercises'
import { workouts } from '@/data/workouts-mock'
</script>

<template>
  <div class="mainContainer">
    <CreateWorkoutForm />
    <h2>Workout mocks:</h2>
    <ul class="workoutsList">
      <li v-for="workout in workouts">
        <WorkoutCard :workout="workout" />
      </li>
    </ul>
    <h2>Exercises list:</h2>
    <ul class="exercisesList">
      <li v-for="exercise in exercises">
        <ExerciseCard :exercise="exercise" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: var(--spacing-lg);
}

.exercisesList,
.workoutsList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
