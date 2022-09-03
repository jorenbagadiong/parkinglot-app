/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      black: "#000",
      white: "#fff",
      gray: "#d9d9d9",
      transparent: "transparent",
    },
  },
  plugins: [],
};
