/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          DEFAULT: '#f97316',
          dark: '#f97316',
        },
        dark: {
          bg: '#1a1b1e',
          card: '#25262b',
          hover: '#2c2d32',
          text: {
            primary: '#ffffff',
            secondary: '#a1a1aa',
          },
          border: '#2e2e35'
        }
      }
    },
  },
  plugins: [],
};