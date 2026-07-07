<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import { useWorkoutById } from '@/composables/useWoroutById'
import { useRoute } from 'vue-router'

const route = useRoute()
const workoutId = Number(route.params.workoutId)

const { workout, workoutExercises } = useWorkoutById(workoutId)

function finishWorkoutSession() {}
</script>

<template>
  <section v-if="workout">
    <h2>You're doing {{ workout.name }}</h2>
    <ul>
      <li v-for="exercise in workoutExercises" :key="exercise.id">
        {{ exercise.name }}
      </li>
    </ul>
    <Button @click="finishWorkoutSession">Finish workout</Button>
  </section>

  <p v-else>This workout could not be found!</p>
</template>

<style></style>
