import plugin from 'tailwindcss/plugin';

export const textOrientation =
    plugin(function ({ addUtilities }) {
      addUtilities({
        // https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
        '.horizontal-writing-tb': { 'writing-mode': 'horizontal-tb' },
        '.vertical-writing-rl': { 'writing-mode': 'vertical-rl' },
        '.vertical-writing-lr': { 'writing-mode': 'vertical-lr' },
        // https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
        '.orientation-mixed': { 'text-orientation': 'mixed' },
        '.orientation-upright': { 'text-orientation': 'upright' },
        '.orientation-sideways-right': { 'text-orientation': 'sideways-right' },
        '.orientation-sideways': { 'text-orientation': 'sideways' },
        '.orientation-glyph': { 'text-orientation': 'use-glyph-orientation' },
      });
    })

export const widthStretch =
  plugin(function ({ addUtilities }) {
    addUtilities({
      '.w-stretch': { 'width': 'stretch' },
      '.w-fill': { 'width': '--webkit-fill-available' },
    });
  })

export const firefox = plugin(function ({ addVariant }) {
    addVariant('firefox', '@-moz-document url-prefix()')
})