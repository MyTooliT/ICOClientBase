<script setup lang="ts">
import Button from 'primevue/button';

withDefaults(defineProps<{
  heading?: string,
  subheading?: string,
  button?: boolean,
  buttonText?: string,
  buttonIconClass?: string
  buttonLoading?: boolean
  border?: boolean
}>(), {
  heading: '',
  subheading: '',
  button: true,
  buttonText: 'Add',
  buttonIconClass: 'pi pi-plus',
  buttonLoading: false,
  border: true
})

const emits = defineEmits<{
  ( event: 'buttonClick' ): void
}>()
</script>

<template>
  <div
    class="flex flex-row justify-between border-gray-200 pb-3 mb-3"
    :class="border ? 'border-b' : ''"
  >
    <div>
      <slot name="heading">
        <h2 class="font-medium text-lg">
          {{ heading }}
        </h2>
      </slot>
      <slot name="subheading">
        <h6 v-if="subheading?.length > 0">
          {{ subheading }}
        </h6>
      </slot>
    </div>
    <slot name="button">
      <Button
        v-if="button"
        outlined
        :label="buttonText"
        :icon="buttonIconClass"
        :loading="buttonLoading"
        class="h-fit"
        @click="emits('buttonClick')"
      />
    </slot>
  </div>
</template>

<style scoped>

</style>