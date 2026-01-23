<script setup lang="ts">
import NavigationButtonSection from '@/ICOClientBase/components/navigation/NavigationButtonSection.vue';
import NavigationButton from '@/ICOClientBase/components/navigation/NavigationButton.vue';
import LoadingSpinner from '@/ICOClientBase/components/LoadingSpinner.vue';

withDefaults(defineProps<{
  themeClass: string,
  showLoader?: boolean,
  loaderMessage?: string,
  navItems: InstanceType<typeof NavigationButtonSection>['$props']['items'],
  navLogo: string,
  navExtraLogo?: string,
}>(), {
  showLoader: false,
  loaderMessage: undefined,
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
      <div class="flex flex-col w-full relative">
        <slot
          v-if="showLoader"
          name="loader">
          <LoadingSpinner :message="loaderMessage" />
        </slot>
        <slot />
      </div>
      <slot name="bottom" />
    </div>
  </div>
</template>