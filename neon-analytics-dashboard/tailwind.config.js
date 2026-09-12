/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07080a',
          900: '#0c0d12',
          850: '#11131a',
          800: '#171922',
          700: '#212430',
        },
        coral: {
          400: '#ff7a59',
          500: '#ff5722',
          600: '#f44336',
        },
        amber: {
          neon: '#ff9800',
        },
        rose: {
          accent: '#f43f5e',
          trend: '#ff4d4f',
        },
        emerald: {
          trend: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'glass-card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.22)',
        'neon-glow': '0 0 25px rgba(255, 87, 34, 0.45)',
        'beacon-glow': '0 0 20px rgba(255, 120, 80, 0.8), 0 0 40px rgba(255, 87, 34, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(255,87,34,0.4))' },
          '100%': { filter: 'drop-shadow(0 0 18px rgba(255,87,34,0.8))' },
        }
      }
    },
  },
  plugins: [],
}
