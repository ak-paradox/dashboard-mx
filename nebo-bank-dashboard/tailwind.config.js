/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nebo: {
          bg: 'var(--nebo-bg)',
          surface: 'var(--nebo-surface)',
          card: 'var(--nebo-card)',
          raised: 'var(--nebo-raised)',
          inset: 'var(--nebo-inset)',
          border: 'var(--nebo-border)',
          text: 'var(--nebo-text)',
          'text-soft': 'var(--nebo-text-soft)',
          accent: 'var(--nebo-accent)',
          'accent-soft': 'var(--nebo-accent-soft)',
          muted: 'var(--nebo-muted)',
          faint: 'var(--nebo-faint)',
          gold: '#E8B84A',
          silver: '#C0C0C5',
          platinum: '#8BA3B8',
          ring: 'var(--nebo-ring)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          'SF Pro Text',
          '-apple-system',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '28px',
        tile: '22px',
        pill: '999px',
      },
      boxShadow: {
        neu: 'var(--shadow-neu)',
        'neu-sm': 'var(--shadow-neu-sm)',
        inset: 'var(--shadow-inset)',
        glow: 'var(--shadow-glow)',
        'glow-sm': 'var(--shadow-glow-sm)',
      },
      backgroundImage: {
        'card-grad': 'var(--grad-card)',
        'accent-grad':
          'linear-gradient(135deg, #FF6B4A 0%, #FF4D2D 55%, #E63A1C 100%)',
        'page-grad': 'var(--grad-page)',
        'promo-grad': 'var(--grad-promo)',
      },
    },
  },
  plugins: [],
};
