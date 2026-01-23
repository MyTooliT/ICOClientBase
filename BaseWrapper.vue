<script setup lang="ts">
defineProps<{
  themeClass: string
}>()
</script>

<template>
  <div :class="themeClass">
    <slot />
  </div>
</template>