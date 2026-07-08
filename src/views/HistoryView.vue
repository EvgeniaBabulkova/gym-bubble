<script setup lang="ts">
import WorkoutSessionCard from '@/components/WorkoutSessionCard.vue'
import { workoutSessions } from '@/data/workout-sessions'
</script>

<template>
  <div>
    <h1>This is the history pageeeee</h1>
    <ul>
      <li v-for="workoutSession in workoutSessions" :key="workoutSession.id">
        <WorkoutSessionCard :workout-session="workoutSession" />
      </li>
    </ul>
  </div>
</template>

<style></style>
