/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customPurple: "#1a163e",
        outLineColor: "#5a3f93",
        colorLogo: "#F57463",
        customGradientWhite: '#FFFFFF',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}