<template>
  <dialog id="my_modal_1" class="modal" :open="showDialog">
    <div class="overflow-x-auto modal-box">
      <slot />
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
    <div method="dialog" class="modal-backdrop">
      <button @click="$emit('close')" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
defineProps<{
  showDialog: boolean
}>()

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (event: 'close'): void
}>()
</script>
