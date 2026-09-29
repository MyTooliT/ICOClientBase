/**
 * Standalone config, kept for consumers that point Tailwind straight at this
 * repository. New projects should use `tailwind.preset.js` instead and declare
 * their own `content` - see the README.
 *
 * @type {import('tailwindcss').Config}
 */
import preset from './tailwind.preset.js';

export default {
  presets: [preset],
  content: ['./src/**/*.{html,js,vue}'],
};
