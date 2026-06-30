<script setup lang="ts">
import Button from '@/components/Button.vue'
import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { exercises } from '@/data/exercises'
import { workoutss } from '@/data/workouts'
import { workoutsMock } from '@/data/workouts-mock'
import type { CreateWorkoutInput, Workout } from '@/types/workouts'
import { ref } from 'vue'

function handleCreateWorkout(workoutInput: CreateWorkoutInput) {
  console.log(workoutInput)
  const newWorkout: Workout = {
    id: Date.now(), // temporary frontend id for now
    ...workoutInput,
  }

  workoutss.value.push(newWorkout)
}
</script>

<template>
  <Button>Lalala</Button>

  <div class="mainContainer">
    <CreateWorkoutForm @create-workout="handleCreateWorkout" />
    <h2>Workouts:</h2>
    <ul class="workoutsList">
      <li v-for="workout in workoutss">
        <WorkoutCard :workout="workout" />
      </li>
    </ul>
    <h2>Exercises:</h2>
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
