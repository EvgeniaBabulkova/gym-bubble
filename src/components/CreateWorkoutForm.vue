<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { CreateWorkoutInput } from '@/types/workouts'
import { ref } from 'vue'
import Button from './UI/Button.vue'
import InputFIeld from './UI/InputFIeld.vue'
import TextArea from './UI/TextArea.vue'
import { useExerciseStore } from '@/stores/exercises.ts'

defineProps<{
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  createWorkout: [workout: CreateWorkoutInput]
  cancel: []
}>()

const exerciseStore = useExerciseStore()
const error = ref('')

onMounted(async () => {
  exerciseStore.fetchExercises()
})

const workoutForm = reactive<CreateWorkoutInput>({
  name: '',
  description: '',
  exerciseIds: [],
})

function resetForm() {
  workoutForm.name = ''
  workoutForm.description = ''
  workoutForm.exerciseIds = []
  error.value = ''
}

function onWorkoutSubmit() {
  if (!workoutForm.name.trim() || workoutForm.exerciseIds.length === 0) {
    error.value = 'Add workout name and select at leeeeeast one exercise!'
    return
  }
  error.value = ''

  const newWorkout = {
    name: workoutForm.name.trim(),
    description: workoutForm.description.trim(),
    exerciseIds: [...workoutForm.exerciseIds],
  }
  emit('createWorkout', newWorkout)
}

function handleCancel() {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <form class="workoutForm" @submit.prevent="onWorkoutSubmit">
    <InputFIeld label="Name" placeholder="E.g. Upper body day" v-model.trim="workoutForm.name" />
    <TextArea
      label="Description"
      placeholder="E.g. Focus on back and shoulders"
      v-model="workoutForm.description"
      :rows="5"
    />
    <fieldset class="exerciseSelection">
      <legend>Choose exercises</legend>
      <label v-for="exercise in exerciseStore.exercises" :key="exercise.id" class="exerciseOption">
        <input v-model="workoutForm.exerciseIds" type="checkbox" :value="exercise.id" />
        <span>{{ exercise.name }}</span>
      </label>
    </fieldset>

    <p v-if="error" class="errorMessage">{{ error }}</p>

    <div class="formActions">
      <Button type="button" variant="secondary" :disabled="isSubmitting" @click="handleCancel">
        Cancel
      </Button>
      <Button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Creating...' : 'Create workout' }}
      </Button>
    </div>
  </form>
</template>

<style scoped>
.workoutForm {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.exerciseSelection {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin: 0;
  padding: 0;
  border: none;
}

.exerciseOption {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.errorMessage {
  margin: 0;
  color: var(--col-error);
}

.formActions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}
</style>
