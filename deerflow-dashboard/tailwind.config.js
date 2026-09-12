/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        vt: ['"VT323"', 'monospace'],
        mono: ['"Share Tech Mono"', '"JetBrains Mono"', '"Space Mono"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        coral: {
          400: '#ff6b4a',
          500: '#ff4d29',
          600: '#e63b17',
          glow: 'rgba(255, 77, 41, 0.4)',
        },
        matrix: {
          dark: '#141519',
          card: '#18191e',
          cardHover: '#1c1e24',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.18)',
          lightBg: '#f0f2f5',
          lightCard: '#ffffff',
          lightBorder: 'rgba(0, 0, 0, 0.08)',
        }
      },
      borderRadius: {
        'card': '24px',
      },
      boxShadow: {
        'card-dark': '0 16px 36px -10px rgba(0, 0, 0, 0.7), 0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
        'card-dark-hover': '0 20px 44px -8px rgba(0, 0, 0, 0.8), 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
        'card-light': '0 16px 36px -10px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        'card-light-hover': '0 20px 44px -8px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 1)',
        'glow-coral': '0 0 15px rgba(255, 77, 41, 0.6)',
      }
    },
  },
  plugins: [],
}
