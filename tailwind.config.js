/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dim"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
