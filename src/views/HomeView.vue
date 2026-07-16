<script setup lang="ts">
import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import Button from '@/components/UI/Button.vue'
import Modal from '@/components/UI/Modal.vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { useExerciseStore } from '@/stores/exercises'
import { useWorkoutStore } from '@/stores/workouts'
import type { CreateWorkoutInput } from '@/types/workouts'
import { ref, onMounted } from 'vue'

const workoutStore = useWorkoutStore()
const exerciseStore = useExerciseStore()

const isCreateWorkoutDialogOpen = ref(false)

onMounted(() => {
  workoutStore.fetchWorkouts()
  exerciseStore.fetchExercises()
})

function openCreateWorkoutDialog() {
  isCreateWorkoutDialogOpen.value = true
}

function closeCreateWorkoutDialog() {
  if (workoutStore.isLoading) return
  isCreateWorkoutDialogOpen.value = false
}

async function handleCreateWorkout(workoutInput: CreateWorkoutInput) {
  await workoutStore.createNewWorkout(workoutInput)
  if (!workoutStore.error) isCreateWorkoutDialogOpen.value = false
}
</script>

<template>
  <div class="mainContainer">
    <section>
      <header class="sectionHeader">
        <h1>Your workouts</h1>
        <Button @click="openCreateWorkoutDialog"> + </Button>
      </header>
      <ul class="workoutsList">
        <li v-for="workout in workoutStore.workouts" :key="workout.id">
          <WorkoutCard :workout="workout" />
        </li>
      </ul>
    </section>

    <section>
      <h2>Exercises</h2>
      <ul class="exercisesList">
        <li v-for="exercise in exerciseStore.exercises" :key="exercise.id">
          <ExerciseCard :exercise="exercise" />
        </li>
      </ul>
    </section>

    <Modal
      :open="isCreateWorkoutDialogOpen"
      title="Create workout"
      @close="closeCreateWorkoutDialog"
    >
      <CreateWorkoutForm
        :is-submitting="workoutStore.isLoading"
        @create-workout="handleCreateWorkout"
        @cancel="closeCreateWorkoutDialog"
      />
      <p v-if="workoutStore.error" class="createWorkoutError">
        {{ workoutStore.error }}
      </p>
    </Modal>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.exercisesList,
.workoutsList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
