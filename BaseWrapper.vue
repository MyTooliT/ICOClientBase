<script setup lang="ts">
import NavigationButtonSection from '@/ICOClientBase/components/navigation/NavigationButtonSection.vue';
import NavigationButton from '@/ICOClientBase/components/navigation/NavigationButton.vue';

withDefaults(defineProps<{
  themeClass: string,
  showLoader?: boolean,
  navItems: InstanceType<typeof NavigationButtonSection>['$props']['items'],
  navLogo: string,
  navExtraLogo?: string,
}>(), {
  showLoader: false,
  navExtraLogo: undefined
})
</script>

<template>
  <div :class="themeClass">
    <div class="flex flex-row h-dvh w-dvw bg-surface overflow-hidden">
      <slot name="nav">
        <nav class="bg-surface-container flex flex-col z-50">
          <NavigationButtonSection :items="navItems" />
          <div class="mt-auto">
            <NavigationButton
              v-if="navExtraLogo !== undefined"
              name="Help"
              to="/help"
            >
              <img
                :src="navExtraLogo"
                alt="Extra Logo for ICOweb client"
                class="w-full max-w-16 mx-auto"
              >
            </NavigationButton>
            <NavigationButton
              name="Help"
              to="/help"
            >
              <img
                :src="navLogo"
                alt="Logo"
                class="w-full max-w-16 mx-auto"
              >
            </NavigationButton>
          </div>
        </nav>
      </slot>
      <slot />
    </div>
  </div>
</template>