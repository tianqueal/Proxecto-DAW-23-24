/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-80%)' },
        },
        'slide-right': {
          from: { transform: 'translateX(-80%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 450s linear infinite',
        'slide-right': 'slide-right 450s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
