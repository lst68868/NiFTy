/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti':  {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#cddc39',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'amber': {
        100: '#ffecb3',
        200: '#ffe082',
        300: '#ffe082',
        400: '#ffd54f',
        500: '#ffca28',
        600: '#ffc107',
        700: '#ffb300',
        800: '#ffa000',
        900: '#ff8f00',
      },
      'silver': '#fafafa',
      'bubble-gum': '#e91e63',
      'bermuda': '#78dcca',
      'red': '#f44336',
      'cyan': '#00bcd4',
      'neon-green': '#39FF14',
      'green': {
        800: '#2e7d32',
        900: '#1b5e20'
      },
      'light-green': '#8bc34a',
      'grey':{
        400: '#bdbdbd'
      },
      'slate': {
        200: '#e2e8f0',
        500: '#64748b',
        900: '#0f172a'
      },
      'teal': {
        500: '#14b8a6'
      },
      'rose': {
        500: '#f43f5e'
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      filter: {
        'glow-purple': 'drop-shadow(0 0 0.5rem rgba(128, 0, 128, 0.7))',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      fontWeight: {
        'orbitron': 900,
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ]
})