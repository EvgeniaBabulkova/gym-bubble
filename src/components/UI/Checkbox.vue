<!-- for later, if i need checkbox in more places: -->

<script setup lang="ts">
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <input type="checkbox" v-model="model" />
</template>

<style scoped>
input {
  width: 16px;
  height: 16px;
}
</style>

<!-- <script setup lang="ts">
defineProps<{
  label: string
  value: number
}>()

const model = defineModel<number[]>({ default: [] })
</script>

<template>
  <label class="checkboxOption">
    <input type="checkbox" v-model="model" :value="value" />
    <span>{{ label }}</span>
  </label>
</template> -->
