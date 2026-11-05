# ICOClientBase

The shared layout, navigation and theming layer for ICO client applications. It
holds what every client in the system looks like, so a new client is a set of
pages rather than a new application shell.

This code was extracted from [ICOweb](https://github.com/MyTooliT/ICOweb), which
is also its first consumer.

## What is in here

| Path | What it does |
| --- | --- |
| `BaseWrapper.vue` | the whole shell: theme class, sidebar nav, logos, loader and bottom slots |
| `layout/DefaultLayout.vue` | padded single-column page body |
| `layout/SplitLayout.vue` | main column plus optional `aside` and `bottom` sections |
| `components/navigation/NavigationButton.vue` | one square sidebar button, active state from the route |
| `components/navigation/NavigationButtonSection.vue` | a menu rendered from a list of items |
| `components/bottom/BottomBar.vue` | status bar with a colour per system state |
| `components/LoadingSpinner.vue` | full-area blurred loading overlay |
| `components/Divider.vue` | horizontal rule on theme colours |
| `configuration/tailwind.preset.js` | Tailwind preset: Material colour tokens, custom utilities, PrimeUI plugin |
| `configuration/tailwindPlugins.ts` | the custom utilities (writing mode, `w-stretch`, `firefox:` variant) |
| `components/TextBlock.vue` | page header: heading, sub-heading and an outlined action button, with a bottom border |
| `configuration/theme.css`, `theme.ts` | the shared theme classes (`.blue`, `.darkblue`) and the matching PrimeVue palettes |
| `configuration/primevue.ts` | `createPrimeVueOptions(palette)`: Aura preset, dark mode on `.app-dark`, no ripple |

### Matching ICOweb's look

- **Buttons are PrimeVue `Button`s** (`outlined`, `link`, `size="small"`, `severity`), not custom
  Tailwind buttons: that is what ICOweb uses, and it gives the thin outlines and no drop shadows.
- The sidebar is at least 93 px wide (ICOweb's width, which comes from its longest label), and
  its buttons are square.
- The bottom bar is at least 39 px high (the loading overlay is sized for it) and its status text
  is right-aligned even when there is no left content (the `left` slot has an empty fallback, so
  `justify-between` keeps a middle slot centred when `left` is used, as in ICOweb).
- Pages sit in `DefaultLayout` (12 px padding, full width, left-aligned) and start with a
  `TextBlock`.
- Tailwind 4 works with this preset: `@import 'tailwindcss'; @config '<path>/tailwind.config.js';`
  (plus `@tailwindcss/vite` or the CLI).

## Requirements for a consumer

The components are plain Vue 3 SFCs with TypeScript and Tailwind classes. A
consumer must bring:

- **Vue 3** with `<script setup>` and **vue-router** - `NavigationButton` uses
  `useRoute`/`useRouter`, so a router must be installed.
- **TailwindCSS 3** using this repository's preset, so `bg-surface`,
  `text-on-primary` and the rest resolve.
- **PrimeVue 4** and `tailwindcss-primeui` - the preset loads the PrimeUI plugin.
- **Vite**, for the `@base` alias. This is the only supported way to resolve the
  components; there is no npm package.
- **A theme stylesheet** defining the `--md-sys-color-*` variables under a class
  name, and that class handed to `BaseWrapper` as `themeClass`.

## Installing it in a new project

### 1. Add the submodule under `src`

```sh
git submodule add https://github.com/MyTooliT/ICOClientBase src/base
git submodule update --init --recursive
```

Any path works, but keep it inside `src` so the consumer's build treats it as
source. Cloning a consumer needs `--recursive`, and CI needs the submodule step -
without it, the build fails on a missing `@base/...` import.

### 2. Alias it to `@base`

**Always `@base`.** Every ICO client uses the same alias, so a snippet moves
between them unchanged, and the components' own internal imports are written
against it.

`vite.config.ts`:

```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@base': path.resolve(__dirname, './src/base'),
  },
},
```

`tsconfig.json`, so the editor and `vue-tsc` agree:

```json
"paths": {
  "@/*": ["src/*"],
  "@base/*": ["src/base/*"]
}
```

### 3. Use the Tailwind preset

`tailwind.config.js`:

```js
import basePreset from './src/base/configuration/tailwind.preset.js';

export default {
  presets: [basePreset],
  content: ['./index.html', './src/**/*.{html,js,ts,vue}'],
};
```

The preset brings the colours, the plugins and `darkMode: 'media'`. The consumer
owns `content` - and it must cover `src/base/**` (the pattern above does), or the
classes used inside the base components get purged.

### 4. Define a theme

The base never hardcodes a colour; every class resolves to a Material token. A
theme is a CSS class defining those variables:

```css
.blue {
  --md-sys-color-primary: rgb(43 99 139);
  --md-sys-color-on-primary: rgb(255 255 255);
  --md-sys-color-surface: rgb(247 249 255);
  --md-sys-color-surface-container: rgb(235 238 243);
  /* ... the full set, see ICOweb's src/theme/theme.css */
}
```

One class per theme, so a customer theme is one more class in that file plus a
PrimeVue palette under the same key in `theme.ts`. Wrap dark values in
`@media (prefers-color-scheme: dark)` inside the same class if the theme should
follow the OS. Then pass the class name to `BaseWrapper`. Keeping the class name,
the `themes` key in `theme.ts` and `VITE_APPLICATION_THEME` identical is the
convention to follow.

### 5. Wrap the application

```vue
<script setup lang="ts">
import { computed } from 'vue';
import BaseWrapper from '@base/BaseWrapper.vue';
import BottomBar, { State } from '@base/components/bottom/BottomBar.vue';
import navLogo from '@/theme/logo.png';
import { useGeneralStore } from '@/stores/generalStore/generalStore.ts';

const store = useGeneralStore();

// `name` must equal the route name, which is how the active button is decided.
const menuItems = computed(() => [
  { name: 'Home', to: '/', iconClass: 'pi pi-wrench', text: 'Devices' },
  { name: 'Measure', to: '/measure', iconClass: 'pi pi-chart-bar', text: 'Measure' },
  { name: 'Config', to: '/config', iconClass: 'pi pi-cog', text: 'Config' },
]);

const statusItems = computed(() => [
  { name: 'API', status: store.systemState.reachable ? 'Reachable' : 'Unreachable' },
  { name: 'CAN', status: store.systemState.canReady ? 'Connected' : 'Disconnected' },
]);
</script>

<template>
  <BaseWrapper
    :theme-class="store.getActiveTheme"
    :nav-items="menuItems"
    :nav-logo="navLogo"
    nav-logo-alt="ICOweb"
    :show-loader="store.globalLoader"
    :loader-message="store.getLoaderInfoMessage">
    <div class="w-full min-h-full overflow-y-auto overflow-x-auto">
      <router-view />
    </div>
    <template #bottom>
      <BottomBar :status-infos="statusItems" :state="State.IDLE" />
    </template>
  </BaseWrapper>
</template>
```

Pages then wrap their content in a layout:

```vue
<script setup lang="ts">
import DefaultLayout from '@base/layout/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout>
    <!-- page content -->
  </DefaultLayout>
</template>
```

## Component reference

### `BaseWrapper`

| Prop | Type | Default | Meaning |
| --- | --- | --- | --- |
| `themeClass` | `string` | required | theme class put on the outermost element |
| `navItems` | `MenuItem[]` | required | sidebar menu; see below |
| `navLogo` | `string` | required | logo image URL, bottom of the sidebar |
| `navLogoAlt` | `string` | `'Application logo'` | its alt text |
| `navExtraLogo` | `string` | - | a second logo above the first |
| `navExtraLogoAlt` | `string` | `'Secondary logo'` | its alt text |
| `logoRoute` | `string` | `'/help'` | where the logo buttons navigate |
| `logoRouteName` | `string` | `'Help'` | route name they highlight for |
| `showLoader` | `boolean` | `false` | show the loading overlay |
| `loaderMessage` | `string` | - | text under the spinner |

Slots: `nav` replaces the whole sidebar, `loader` the overlay, `bottom` sits below
the router view (the bottom bar goes here), and the default slot is the page area.

`MenuItem` is `{ name, to, iconClass, text, disabled? }`. `name` must match the
route name - that comparison is what marks a button active. `iconClass` is a
PrimeIcons class such as `pi pi-cog`.

### `BottomBar`

`statusInfos` is a list of `{ name, status, iconClass? }`, rendered right-aligned
as `name: status`. `state` is one of `State.IDLE`, `State.ACTIVE`, `State.WARNING`,
`State.ERROR` and picks the bar's colours; pass `stateClassMap` to override them.
Slots: `left`, default (centre), `right` (replaces the status list).

### `SplitLayout`

Default slot is the main column. `aside` adds a right column with a separator;
`bottom` adds a section below a divider. Both only render when filled.

## Conventions

- **The base owns the frame, the consumer owns the content.** Anything specific to
  one application - pages, stores, API calls, wording - stays in the consumer.
- **No colour literals.** Only Material token classes (`bg-surface`,
  `text-on-surface-variant`, `border-outline-variant`), so every consumer's theme
  works.
- **No application names** in the base, including alt texts and labels. Anything
  that names a product belongs in a prop.
- **Additive changes.** Consumers pin a submodule commit, but a breaking prop
  change still breaks them on their next bump. Prefer a new optional prop with a
  default that keeps the current behaviour.

## Updating the base in a consumer

```sh
git submodule update --remote src/base
git add src/base && git commit -m "Bump ICOClientBase"
```

The submodule commit is part of the consumer's history, so a consumer keeps
building against the base it was tested with until someone bumps it deliberately.

When changing the base while working in a consumer, commit and push inside
`src/base` first, then commit the new pointer in the consumer. Uncommitted changes
inside a submodule are invisible to everyone else - including CI, which checks out
the recorded commit.

## Still open

- **No tests and no lint setup of its own.** The components are only exercised
  through the consumers.
- **No package.json.** The peer requirements above are documented, not enforced.
