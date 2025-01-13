import typographyStyles from './typography.js'
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    typography: typographyStyles,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}
