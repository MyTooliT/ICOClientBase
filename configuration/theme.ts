/**
 * PrimeVue primary palettes, one per theme class defined in `theme.css` (same key = same name).
 * Use with `createPrimeVueOptions(themes.blue)`.
 */
export const themes = {
    blue: {
        50: '#cce0eb',
        200: '#99c1d6',
        300: '#66a3c2',
        400: '#3384ad',
        450: '#1a74a3',
        500: '#006599',
        550: '#005b8a',
        600: '#00517a',
        700: '#003d5c',
        800: '#00283d',
        950: '#00141f',
    },
    yellow: {
        50: '#fffcf1',
        100: '#fffae3',
        200: '#fef5c2',
        300: '#feef99',
        400: '#fdea5b',
        500: '#fae643',
        600: '#c2b232',
        700: '#8e8222',
        800: '#5e5613',
        900: '#312d06',
        950: '#1d1a02',
    },
    brown: {
        50: '#fef2af',
        100: '#fae643',
        200: '#dac839',
        300: '#bcad30',
        400: '#9f9227',
        500: '#83781f',
        600: '#685f16',
        700: '#4e470e',
        800: '#363107',
        900: '#1f1c03',
        950: '#141101',
    },
    darkblue: {
        50: '#e9eef6',
        100: '#d4dded',
        200: '#a8bddc',
        300: '#7a9ecb',
        400: '#617ea3',
        500: '#49607d',
        600: '#3a4d65',
        700: '#2b3a4d',
        800: '#1d2937',
        900: '#101822',
        950: '#090f16',
    }
} as const;
