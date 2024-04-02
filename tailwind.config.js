/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowColor: "#F5E76D",
      },
      screens: {
        'dif': '460px',
        'respo': '690px',
        'bro': '540px',
        'sxl': '1140px',
      }
    },
  },
  plugins: [],
}

