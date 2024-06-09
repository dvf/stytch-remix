import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#C78EFF",
          indigo: "#9794FF",
          blue: "#5956FF",
          gold: "#DDC33F",
          silver: "#C0C0C0",
          bronze: "#F7931A",
          red: "#EB1656",
          leaf: "#047F42",
          lime: "#56FFB8",
          "gray-900": "#0E0F14",
          "gray-800": "#15161F",
          "gray-700": "#191A23",
          "gray-600": "#20212D",
          "gray-500": "#292A3A",
          "gray-400": "#323442",
          "gray-300": "#6A6C78",
          "gray-200": "#A6A9B6",
          "gray-100": "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
