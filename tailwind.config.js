import defaultTheme from "tailwindcss/defaultTheme";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import plaiceholder from "@plaiceholder/tailwindcss";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["fa-brands", "heroicons"]),
    }),
    plaiceholder(),
  ],
};
