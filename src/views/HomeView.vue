<script setup lang="ts">
import ExerciseCard from '@/components/ExerciseCard.vue'
</script>

<template>
  <div class="lala">
    <h2>Starting with the exercises list:</h2>
    <ExerciseCard />
  </div>
</template>

<style scoped>
.lala {
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: var(--spacing-lg);
}
</style>
