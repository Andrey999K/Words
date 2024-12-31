/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "first-gray": "#403f3f",
        "second-gray": "#5e5d5d",
      },
    },
  },
  plugins: [],
};
