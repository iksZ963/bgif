// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              darkGreen: '#14342B',
              asparagus: '#60935D',
              oldGold: '#BAB700',
              celadon: '#BBDFC5',
              brilliantRose: '#FF579F',
          },
          fontFamily: {
            custom: ['AbuSayed', 'sans-serif'], 
          },
      },
  },
  plugins: [],
}
