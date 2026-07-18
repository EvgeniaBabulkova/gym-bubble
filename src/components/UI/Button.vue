<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
}>()
</script>

<template>
  <button :class="{ buttonSecondary: variant === 'secondary' }">
    <slot>Default btn text</slot>
  </button>
</template>

<style scoped>
button {
  background-color: var(--col-graph-1);
  padding: var(--spacing-sm) var(--spacing-md);
  width: fit-content;
  font: var(--font-button);
  color: var(--col-text-invert);
  cursor: pointer;
}

.buttonSecondary {
  background-color: var(--col-graph);
  color: var(--col-text-primary);
  font: var(--font-bodyStd);
}

button:hover {
  background-color: var(--col-graph-2);
}
</style>
