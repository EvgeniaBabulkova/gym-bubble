<script setup lang="ts">
import { reactive } from 'vue'
import { exercises } from '@/data/exercises'
import type { CreateWorkoutInput } from '@/types/workouts'
import { ref } from 'vue'
import Button from './UI/Button.vue'
import InputFIeld from './UI/InputFIeld.vue'
import TextArea from './UI/TextArea.vue'

const emit = defineEmits<{
  createWorkout: [workout: CreateWorkoutInput]
}>()

const workoutForm = reactive<CreateWorkoutInput>({
  name: '',
  description: '',
  exerciseIds: [],
})
const error = ref('')

function onWorkoutSubmit() {
  // 1. create a data object from the user data
  // 2. pass it in an emit
  // 3. clear the inputs

  if (workoutForm.name.trim() && workoutForm.exerciseIds.length > 0) {
    error.value = ''
    const newWorkout = {
      name: workoutForm.name.trim(),
      description: workoutForm.description.trim(),
      exerciseIds: workoutForm.exerciseIds,
    }
    emit('createWorkout', newWorkout)
    workoutForm.name = ''
    workoutForm.description = ''
    workoutForm.exerciseIds = []
  } else {
    error.value = 'Make suuure to have name and exercises selected!'
  }
}
</script>

<template>
  <form class="workoutForm" @submit.prevent="onWorkoutSubmit">
    <h2>Create a workout:</h2>

    <InputFIeld label="Name" placeholder="E.g. Upper body day" v-model.trim="workoutForm.name" />
    <TextArea
      label="Description"
      placeholder="E.g. Focus on back and shoulders"
      v-model="workoutForm.description"
      :rows="5"
    />

    <label for="exercises">Choose exercises</label>
    <label v-for="exercise in exercises" :key="exercise.id">
      <input type="checkbox" v-model="workoutForm.exerciseIds" :value="exercise.id" />
      {{ exercise.name }}
    </label>

    <p>{{ error }}</p>
    <Button type="submit">Submitt</Button>
  </form>
</template>

<style scoped>
/* remove  */
.input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

p {
  color: var(--col-error);
}

.workoutForm {
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: var(--spacing-md);
}
</style>
