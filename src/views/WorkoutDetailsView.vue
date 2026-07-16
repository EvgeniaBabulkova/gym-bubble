<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import { useWorkoutStore } from '@/stores/workouts'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const workoutId = Number(route.params.workoutId)
const workoutStore = useWorkoutStore()
onMounted(() => workoutStore.fetchWorkouts())
const workout = computed(() => workoutStore.getWorkoutById(workoutId))

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
      <li v-for="workoutExercise in workout.workoutExercises" :key="workoutExercise.id">
        {{ workoutExercise.name }}
      </li>
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
