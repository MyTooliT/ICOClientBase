<script setup lang="ts">
import NavigationButton from '@/ICOClientBase/components/navigation/NavigationButton.vue';

type MenuItem = {
  name: string
  to: string
  iconClass: string
  text: string
  disabled?: boolean
}
defineProps<{
  items: MenuItem[]
}>()
</script>

<template>
  <NavigationButton
    v-for="item in items"
    :key="item.name"
    :to="item.to"
    :name="item.name"
    :disabled="item.disabled"
  >
    <span
      :class="item.iconClass"
      style="font-size: 1.5em;" />
    <span>{{ item.text }}</span>
  </NavigationButton>
</template>