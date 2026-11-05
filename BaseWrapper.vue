<script setup lang="ts">
import NavigationButtonSection from '@base/components/navigation/NavigationButtonSection.vue';
import NavigationButton from '@base/components/navigation/NavigationButton.vue';
import LoadingSpinner from '@base/components/LoadingSpinner.vue';

withDefaults(defineProps<{
  themeClass: string,
  showLoader?: boolean,
  loaderMessage?: string,
  navItems: InstanceType<typeof NavigationButtonSection>['$props']['items'],
  navLogo: string,
  navLogoAlt?: string,
  navExtraLogo?: string,
  navExtraLogoAlt?: string,
  /** Where the logo buttons navigate to. */
  logoRoute?: string,
  /** Route name the logo buttons highlight for, matched against the active route. */
  logoRouteName?: string,
}>(), {
  showLoader: false,
  loaderMessage: undefined,
  navLogoAlt: 'Application logo',
  navExtraLogo: undefined,
  navExtraLogoAlt: 'Secondary logo',
  logoRoute: '/help',
  logoRouteName: 'Help'
})
</script>

<template>
  <div :class="themeClass">
    <div class="flex flex-row min-h-dvh bg-surface overflow-hidden">
      <slot name="nav">
        <nav class="bg-surface-container flex flex-col z-50 min-w-[93px]">
          <NavigationButtonSection :items="navItems" />
          <div class="mt-auto">
            <NavigationButton
              v-if="navExtraLogo !== undefined"
              :name="logoRouteName"
              :to="logoRoute"
            >
              <img
                :src="navExtraLogo"
                :alt="navExtraLogoAlt"
                class="w-full max-w-16 mx-auto"
              >
            </NavigationButton>
            <NavigationButton
              :name="logoRouteName"
              :to="logoRoute"
            >
              <img
                :src="navLogo"
                :alt="navLogoAlt"
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
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>
