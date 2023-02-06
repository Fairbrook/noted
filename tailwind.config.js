/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#f9f9f9',
        bg: '#242424',
        secondary: '#404040'
      }
    }
  },
  plugins: []
}
