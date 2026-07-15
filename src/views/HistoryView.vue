<script setup lang="ts">
import WorkoutSessionCard from '@/components/WorkoutSessionCard.vue'
import { useWorkoutSessionsStore } from '@/stores/workoutSessions'

const workoutSessionsStore = useWorkoutSessionsStore()

// onMounted(() => { // do the same in analytics page
//   workoutSessionsStore.fetchWorkoutSessions()
// })
</script>

<template>
  <div>
    <h1>This is the history pageeeee</h1>
    <ul>
      <li v-for="workoutSession in workoutSessionsStore.workoutSessions" :key="workoutSession.id">
        <WorkoutSessionCard :workout-session="workoutSession" />
      </li>
    </ul>
  </div>
</template>

<style></style>
