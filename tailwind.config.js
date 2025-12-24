/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "from": { opacity: "0", transform: "translateY(10px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "from": { opacity: "0" },
          "to": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}