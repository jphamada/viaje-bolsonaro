/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        editorial: {
          bg: "#fbfbfb",
          card: "#ffffff",
          text: "#121212",
          muted: "#666666",
          accent: "#b91c1c", // NYT style crimson accent
          border: "#e5e5e5",
          highlight: "#0284c7",
        },
      },
    },
  },
  plugins: [],
};
