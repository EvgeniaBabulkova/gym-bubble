<script setup lang="ts">
defineProps<{
  label: string
  errorText?: string // todo: use this for the errors in the form
  modelValue: string
}>()

defineOptions({ inheritAttrs: false })

// the new way for v-model: (then using this in the input)
// const model = defineModel<string>(), {default: ''}

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label>
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

<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 200px;
}

input::placeholder {
  font: var(--font-bodyStd);
}
</style>
