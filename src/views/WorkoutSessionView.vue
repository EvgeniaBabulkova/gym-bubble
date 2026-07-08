<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import TextArea from '@/components/UI/TextArea.vue'
import { useWorkoutById } from '@/composables/useWorkoutById'
import { workoutSessions } from '@/data/workout-sessions'
import type { WorkoutSession } from '@/types/workouts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const workoutId = Number(route.params.workoutId)

const { workout, workoutExercises } = useWorkoutById(workoutId)
const activeExercises = ref<number[]>([])
const exerciseSetDrafts = ref<Record<number, string>>({})

// close empty exercises, then make exercise active
function makeExerciseActive(exerciseId: number) {
  activeExercises.value = activeExercises.value.filter((id) => exerciseSetDrafts.value[id]?.trim())

  if (!activeExercises.value.includes(exerciseId)) {
    activeExercises.value.push(exerciseId)
  }
}

function handleCreateWorkoutSession() {
  // todo: are u sure u want to finish this workout?
  // todo: yes -> congrats popup with summary -> history page

  const performedExercises = workoutExercises.value
    .filter((exercise) => exerciseSetDrafts.value[exercise.id]?.trim())
    .map((exercise) => ({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      setNotes: exerciseSetDrafts.value[exercise.id]!,
    }))

  const newWorkoutSession: WorkoutSession = {
    id: Date.now(),
    workoutId: workoutId,
    workoutName: workout.value?.name!,
    performedAt: new Date().toISOString(),
    exercises: performedExercises,
  }
  workoutSessions.value.push(newWorkoutSession)

  console.log(workoutSessions.value)
  router.push({ name: 'history' })
}
</script>

<template>
  <form v-if="workout" @submit.prevent="handleCreateWorkoutSession">
    <h2>You're doing {{ workout.name }}</h2>
    <ul>
      <li v-for="exercise in workoutExercises" :key="exercise.id">
        {{ exercise.name }}
        <TextArea
          v-if="activeExercises.includes(exercise.id)"
          v-model="exerciseSetDrafts[exercise.id]"
          label="Sets and reps"
          :rows="2"
        />
        <Button variant="secondary" v-else type="button" @click="makeExerciseActive(exercise.id)"
          >Add set data</Button
        >
      </li>
    </ul>
    <Button type="submit">Finish workout</Button>
  </form>

  <p v-else>This workout could not be found!</p>
</template>

<style></style>
