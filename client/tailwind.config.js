/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

        fontFamily: {
          kittenPaw: ['KittenPaw', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
          cuteCat: ['CuteCat', 'Poppins', 'sans-serif'],

        },
      
    },
  },
  plugins: [],
}