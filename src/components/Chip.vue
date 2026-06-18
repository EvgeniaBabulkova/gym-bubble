<script setup lang="ts">
const { text } = defineProps<{
  text: string
}>()
</script>

<template>
  <div>{{ text }}</div>
</template>

<style scoped>
div {
  display: flex;
  width: fit-content;
  justify-content: center;
  background-color: var(--col-surface-tertiary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  font: var(--font-chip);
}
</style>
