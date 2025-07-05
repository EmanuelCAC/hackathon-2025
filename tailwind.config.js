/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#054C48", //Brunswick green
        secondary: "#F5AB00", //Harvest gold
        tertiary: "#A94463", //Raspberry rose
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#262626",
        },
        gray: {
          100: "#C4C4C4",
          200: "#D0D0D0"
        },
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
}