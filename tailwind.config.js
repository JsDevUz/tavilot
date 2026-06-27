/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E9BE5F',
        secondary: '#F1D99B',
        teal: '#007577',
        paper: '#F9F9FA',
        mainBack: '#F4F4F4',
        hint: '#8B8B8B',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        arabic: ['Lateef', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 55px rgba(233, 190, 95, 0.18)',
      },
    },
  },
  plugins: [],
};
