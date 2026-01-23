<script setup lang="ts">
import NavigationButtonSection from '@/ICOClientBase/components/navigation/NavigationButtonSection.vue';

withDefaults(defineProps<{
  themeClass: string,
  showLoader?: boolean,
  navItems: InstanceType<typeof NavigationButtonSection>['$props']['items']
}>(), {
  showLoader: false
})
</script>

<template>
  <div :class="themeClass">
    <div class="flex flex-row h-dvh w-dvw bg-surface overflow-hidden">
      <slot name="nav">
        <nav class="bg-surface-container flex flex-col z-50">
          <NavigationButtonSection :items="navItems" />
        </nav>
      </slot>
      <slot />
    </div>
  </div>
</template>