/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        df: {
          bg: 'var(--df-bg)',
          card: 'var(--df-card)',
          text: 'var(--df-text)',
          'text-soft': 'var(--df-text-soft)',
          muted: 'var(--df-muted)',
          faint: 'var(--df-faint)',
          accent: 'var(--df-accent)',
          'accent-soft': 'var(--df-accent-soft)',
          ink: 'var(--df-ink)',
          led: 'var(--df-led)',
        },
      },
      fontFamily: {
        doto: ['Doto', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        tile: '22px',
      },
      boxShadow: {
        tile: 'var(--shadow-tile)',
        'tile-sm': 'var(--shadow-tile-sm)',
      },
    },
  },
  plugins: [],
};
