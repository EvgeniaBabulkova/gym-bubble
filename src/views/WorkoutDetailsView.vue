<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import { useWorkoutById } from '@/composables/useWoroutById'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const workoutId = Number(route.params.workoutId)
const { workout, workoutExercises } = useWorkoutById(workoutId)

function startWorkoutSession() {
  router.push({
    name: 'workout-session',
    params: {
      workoutId: workoutId,
    },
  })
}
</script>

<template>
  <section v-if="workout">
    <h3>{{ workout.name }}</h3>
    <p>{{ workout.description }}</p>
    <ul>
      <li v-for="exercise in workoutExercises" :key="exercise.id">{{ exercise.name }}</li>
    </ul>
    <Button @click="startWorkoutSession">Start workoutt!!</Button>
  </section>

  <p v-else>This workout couldd not be found!</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}
</style>
