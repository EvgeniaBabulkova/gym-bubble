<script setup lang="ts">
import { reactive } from 'vue'

const workoutForm = reactive({
  name: '',
  description: '',
  exercises: [],
})
function onWorkoutSubmit() {}
</script>

<template>
  <form class="workoutForm" @submit.prevent="onWorkoutSubmit">
    <h2>Create a workout form</h2>
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

input {
  height: 30px;
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
