/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.12)'
      },
      colors: {
        ink: '#0F172A',
        surface: '#F8FAFC',
        accent: {
          50: '#eefdf8',
          100: '#d7faef',
          500: '#0f9d7a',
          600: '#0c8164'
        },
        warn: {
          500: '#dc7b31'
        }
      }
    }
  },
  plugins: []
};