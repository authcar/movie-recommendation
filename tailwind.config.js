/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        sans: ["Archivo", "sans-serif"], // ini default semua
      },
    },
  },
  plugins: [],
};
