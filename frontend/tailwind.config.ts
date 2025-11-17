import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      colors: {
        primary: "#1B84E7",
        primaryDark: "#0E62B7",
        accent: "#2ED3B7",
        surface: "#F7FBFF",
        text: "#0F172A",
      },
    },
  },
  plugins: [],
};

export default config;
