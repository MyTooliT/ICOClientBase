<script setup lang="ts">
import {RouteLocationRaw, useRoute, useRouter} from 'vue-router';

const router = useRouter()
const route = useRoute()

const props = defineProps<{
  to: RouteLocationRaw;
  name: string;
  disabled?: boolean;
}>()
</script>

<template>
  <button
    :data-active="route.matched.map(match => match.name).includes(props.name)"
    :data-disabled="disabled"
    :disabled="disabled"
    class="
      p-2 flex flex-col justify-center items-center w-full
      aspect-square transition-all duration-100
      hover:bg-surface-variant
      data-[disabled=true]:hover:bg-inherit data-[disabled=true]:cursor-not-allowed
      data-[disabled=true]:opacity-60
      data-[active=true]:bg-surface data-[active=true]:text-primary"
    @click="router.push(props.to)">
    <slot>
      {{ props.name }}
    </slot>
  </button>
</template>