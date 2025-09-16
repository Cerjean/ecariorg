/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ucao-blue': {
          light: '#E6F0FF',
          DEFAULT: '#0A2D6E',
          dark: '#061A40',
        },
        'ucao-yellow': {
          DEFAULT: '#FDB813',
          dark: '#E8A800',
        },
      },
    }
  },
  plugins: [],
};
