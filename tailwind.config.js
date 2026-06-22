/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C99F69',
        secondary: '#EAD3B7',
        paper: '#F9F9FA',
        mainBack: '#F4F4F4',
        hint: '#8B8B8B',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Scheherazade New"', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 55px rgba(201, 159, 105, 0.18)',
      },
    },
  },
  plugins: [],
};
