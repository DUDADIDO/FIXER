/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appBlue1: "#48CAF8",
        appBlue2: "#88DDFB",
        appBlue3: "#C8EFFD",
        appBlue4: "#E2F6FE",
        appRed: "#FB88AF",
        appYellow: "#FBEB88",
        appOrange: "#FBA688",
        appGreen: "#DCFB88",
        appPink: "#FB88DD",
        appGrey1: "#F3F6F8",
        appGrey2: "#E2E8E6",
      },
    },
  },
  plugins: [],
}