<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="absolute w-full [height:calc(100%-39px)] flex flex-col gap-3 justify-center items-center z-40 backdrop-blur">
      <slot>
        <div class="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </slot>
      <div class="text-gray-600 text-base">
        <slot name="message">
          {{ message }}
        </slot>
      </div>
    </div>
  </div>
</template>