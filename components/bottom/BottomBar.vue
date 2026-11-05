<script lang="ts">
export enum State {
  ERROR = 'error',
  IDLE = 'idle',
  WARNING = 'warning',
  ACTIVE = 'active'
}

const defaultMap: Record<State, string> = {
  [State.ERROR]: 'bg-error-container text-on-error-container',
  [State.WARNING]: 'bg-tertiary-container text-on-tertiary-container',
  [State.IDLE]: 'bg-primary-container text-on-primary-container',
  [State.ACTIVE]: 'bg-secondary text-on-secondary'
}
</script>

<script setup lang="ts">
type BBStatusProps = {
  name: string
  status?: string
  iconClass?: string
}

withDefaults(defineProps<{
  statusInfos: BBStatusProps[],
  state?: State,
  stateClassMap?: Record<State, string>
}>(), {
  state: State.ERROR,
  stateClassMap: () => defaultMap
})
</script>

<template>
  <div class="w-full absolute bottom-0 left-0">
    <div
      class="w-full min-h-[39px] pr-6 pb-1 text-right
        flex flex-row justify-between items-center"
      :class="stateClassMap[state]"
    >
      <slot name="left">
        <div />
      </slot>
      <slot />
      <slot name="right">
        <div class="text-sm h-min flex self-center text-inherit">
          <span
            v-for="(status, index) in statusInfos"
            :key="status.name"
          >
            <span>{{ status.name }}:&nbsp;</span>
            <span>{{ status.status }}</span>
            <span
              v-if="status.iconClass"
              :class="status.iconClass" />
            <span v-if="index !== statusInfos.length - 1">&nbsp;|&nbsp;</span>
          </span>
        </div>
      </slot>
    </div>
  </div>
</template>