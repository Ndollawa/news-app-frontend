/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    
      screens: {
        'xs': '320px',
        ...defaultTheme.screens,
      },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}