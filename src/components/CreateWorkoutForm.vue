<script setup lang="ts">
import { reactive } from 'vue'
import { exercises } from '@/data/exercises'
import type { CreateWorkoutInput } from '@/types/workouts'

const emit = defineEmits<{
  createWorkout: [workout: CreateWorkoutInput]
}>()

const workoutForm = reactive<CreateWorkoutInput>({
  name: '',
  description: '',
  exerciseIds: [],
})

function onWorkoutSubmit() {
  // 1. create a data object from the user data
  // 2. pass it in an emit
  // 3. clear the inputs

  const newWorkout = {
    name: workoutForm.name,
    description: workoutForm.description,
    exerciseIds: workoutForm.exerciseIds,
  }
  emit('createWorkout', newWorkout)

  workoutForm.name = ''
  workoutForm.description = ''
  workoutForm.exerciseIds = []
}
</script>

<template>
  <form class="workoutForm" @submit.prevent="onWorkoutSubmit">
    <h2>Create a workout:</h2>
    <!-- todo: abstract input into component -->
    <div class="input">
      <label for="workoutName">Name:</label>
      <input id="workoutName" placeholder="E.g. Upper body day" v-model="workoutForm.name" />
    </div>

    <!-- todo: abstract textarea into component -->
    <div class="input">
      <label for="workoutDescription">Review:</label>
      <textarea
        id="workoutDescription"
        placeholder="E.g. Focus on back and shoulders"
        v-model="workoutForm.description"
      ></textarea>

      <label for="exercises">Choose exercises:</label>
      <label v-for="exercise in exercises" :key="exercise.id">
        <input type="checkbox" v-model="workoutForm.exerciseIds" :value="exercise.id" />

        {{ exercise.name }}
      </label>

      <!-- todo: abstract the button into component -->
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<style>
.input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.workoutForm {
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: var(--spacing-md);
}

input::placeholder,
textarea::placeholder {
  font: var(--font-bodyStd);
}
</style>
