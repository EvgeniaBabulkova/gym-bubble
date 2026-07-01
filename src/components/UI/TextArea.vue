<script setup lang="ts">
defineProps<{
  label: string
  errorText?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <textarea v-bind="$attrs" v-model="model"></textarea>
    <small v-if="errorText">{{ errorText }}</small>
  </label>
</template>

<style></style>
