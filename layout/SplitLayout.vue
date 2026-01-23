<script setup lang="ts">
import Divider from '@/ICOClientBase/components/Divider.vue'
const slots = defineSlots<{
  default: any,
  aside: any,
  bottom: any
}>();
</script>

<template>
  <div class="[margin-bottom:40px]">
    <div class="p-3">
      <div class="flex flex-row">
        <div class="flex flex-col flex-grow">
          <slot />
        </div>
        <div
          v-if="slots.aside"
          class="flex flex-row ml-3 pl-3 border-l"
        >
          <slot name="aside" />
        </div>
      </div>
      <Divider v-if="slots.bottom" />
      <slot name="bottom" />
    </div>
  </div>
</template>