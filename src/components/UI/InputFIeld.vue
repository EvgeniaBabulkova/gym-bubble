<script setup lang="ts">
defineProps<{
  label: string
  errorText?: string // todo: input validation
  modelValue: string
}>()

defineOptions({ inheritAttrs: false })

// the new way for v-model: (then using this in the input)
// const model = defineModel<string>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="field">
    <span>{{ label }}</span>
    <input
      type="text"
      v-bind="$attrs"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <small v-if="errorText">{{ errorText }}</small>
  </label>
</template>

<style>
/* also for textarea */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 200px;
}
</style>
