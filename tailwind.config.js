/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
      screens: {
        'xs': '320px',
        ...defaultTheme.screens,
      },
    extend: {
      fontFamily:{
        'poppins':['Poppins','Roboto','sans-serif']
      },
    },
  },
  plugins: [
  ],
}