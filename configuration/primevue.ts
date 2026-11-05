import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

/**
 * The PrimeVue settings every ICO client uses: the Aura preset with the theme's primary palette,
 * dark mode only on `.app-dark`, no ripple.
 *
 *   app.use(PrimeVue, createPrimeVueOptions(themes.blue));
 */
export function createPrimeVueOptions(primary: Record<string | number, string>) {
  return {
    theme: {
      preset: definePreset(Aura, { semantic: { primary } }),
      options: { darkModeSelector: '.app-dark' },
    },
    ripple: false,
  };
}
