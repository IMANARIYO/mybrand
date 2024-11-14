/** @type {import('tailwindcss').Config} */
import('tailwindcss').Config
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
        titleFont: ["Montserrat", "sans-serif"],
      },
      colors: {
        bodyColor: "#212428",
        lightText: "#c4cfde",
        boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
        designColor: "#0eea6a",
        designColor: "#35a8f0",
      },
      boxShadow: {
        shadowOne: "10px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
 
        whiteshadowlight: "0px 0px 5px rgba(255, 255, 255, 0.4)",
        whiteshadowstrong: "0px 0px 15px rgba(255, 255, 255, 0.8)",

      },
    },
  },
  plugins: [],
}

