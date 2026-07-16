<script setup lang="ts">
import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { useExerciseStore } from '@/stores/exercises'
import { useWorkoutStore } from '@/stores/workouts'
import type { CreateWorkoutInput, Workout } from '@/types/workouts'
import { onMounted } from 'vue'

const workoutStore = useWorkoutStore()
const exerciseStore = useExerciseStore()

onMounted(() => {
  workoutStore.fetchWorkouts()
  exerciseStore.fetchExercises()
})

function handleCreateWorkout(workoutInput: CreateWorkoutInput) {
  workoutStore.createNewWorkout(workoutInput)
}
</script>

<template>
  <div class="mainContainer">
    <CreateWorkoutForm @create-workout="handleCreateWorkout" />
    <h2>Workouts:</h2>
    <ul class="workoutsList">
      <li v-for="workout in workoutStore.workouts">
        <WorkoutCard :workout="workout" :key="workout.id" />
      </li>
    </ul>
    <h2>Exercises:</h2>
    <ul class="exercisesList">
      <li v-for="exercise in exerciseStore.exercises">
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
