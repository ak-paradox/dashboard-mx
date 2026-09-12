/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#f5f6fa',
          50: '#fafbfd',
          100: '#f5f6fa',
          200: '#eef0f6',
        },
        card: {
          DEFAULT: '#ffffff',
          border: '#f0f1f5',
        },
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '18': '4.5rem',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.02)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.03)',
        'topbar': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)',
        'sidebar': '1px 0 8px rgba(0,0,0,0.03)',
        'dropdown': '0 4px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'pill': '0 1px 6px rgba(0,0,0,0.06)',
        'btn': '0 1px 3px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
