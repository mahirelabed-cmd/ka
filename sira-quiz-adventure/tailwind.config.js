/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="day"]'],
  theme: {
    extend: {
      colors: {
        night: 'var(--night)',
        'night-soft': 'var(--night-soft)',
        'sand-gold': 'var(--sand-gold)',
        parchment: 'var(--parchment)',
        'parchment-dim': 'var(--parchment-dim)',
        oasis: 'var(--oasis)',
        line: 'var(--line)',
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        'surface-soft': 'var(--surface-soft)',
        'text-main': 'var(--text-main)',
        'text-dim': 'var(--text-dim)',
      },
      fontFamily: {
        display: ['Amiri', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['2.5rem', { lineHeight: '1.2' }],
        'display-lg': ['2rem', { lineHeight: '1.25' }],
        'display-md': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.6' }],
        'body-md': ['1.0625rem', { lineHeight: '1.6' }],
        'ui-md': ['0.9375rem', { lineHeight: '1.4' }],
        'ui-sm': ['0.8125rem', { lineHeight: '1.4' }],
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
};
