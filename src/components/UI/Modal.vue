<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{ close: [] }>()

const dialogElement = ref<HTMLDialogElement | null>(null)

watch(
  () => props.open,
  (isOpen) => {
    const dialog = dialogElement.value

    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  },
)

function handleCancel() {
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialogElement.value) {
    emit('close')
  }
}
</script>

<template>
  <dialog
    ref="dialogElement"
    class="dialog"
    :aria-labelledby="`${title}-dialog-title`"
    @cancel.prevent="handleCancel"
    @click="handleBackdropClick"
  >
    <div class="dialogContent">
      <header class="dialogHeader">
        <h2 :id="`${title}-dialog-title`">
          {{ title }}
        </h2>

        <Button
          class="closeButton"
          type="button"
          variant="secondary"
          aria-label="Close dialog"
          @click="handleCancel"
        >
          ×
        </Button>
      </header>

      <div class="dialogBody">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  width: min(600px, calc(100% - (2 * var(--spacing-lg))));
  padding: 0;
  border: none;
  background: transparent;
  margin: auto;
  color: inherit;
}

.dialog::backdrop {
  background: var(--overlay);
}

.dialogContent {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  background: var(--col-surface-primary);
}

.dialogHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.dialogBody {
  display: flex;
  flex-direction: column;
}
</style>
