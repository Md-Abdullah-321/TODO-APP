/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "Primary-Color": "#673AB7",
      "Secondary-Color": "#FFC107",
      "Background-Color": "#FAFAFA",
      "Text-Color": "#444444"
    },
    extend: {},
  },
  plugins: [],
}