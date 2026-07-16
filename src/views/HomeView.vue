<script setup lang="ts">
import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { exercises } from '@/data/exercises'
import { workoutss } from '@/data/workouts'
import { useWorkoutStore } from '@/stores/workouts'
import type { CreateWorkoutInput, Workout } from '@/types/workouts'
import { onMounted } from 'vue'

const workoutStore = useWorkoutStore()

onMounted(() => {
  workoutStore.fetchWorkouts()
})

function handleCreateWorkout(workoutInput: CreateWorkoutInput) {
  // console.log(workoutInput)
  // const newWorkout: Workout = {
  //   id: Date.now(), // temporary frontend id for now
  //   ...workoutInput,
  // }
  // workoutss.value.push(newWorkout)
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
