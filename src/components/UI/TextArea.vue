<script setup lang="ts">
defineProps<{
  label: string
  errorText?: string
  rows: number
}>()

const model = defineModel<string>()
</script>

<template>
  <label class="field">
    <span>{{ label }}</span>
    <textarea v-bind="$attrs" v-model="model" :rows="rows"></textarea>
    <small v-if="errorText">{{ errorText }}</small>
  </label>
</template>
