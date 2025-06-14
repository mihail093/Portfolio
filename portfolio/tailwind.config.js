/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: []
}

