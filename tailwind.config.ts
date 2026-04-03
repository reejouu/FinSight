import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-custom)', 'sans-serif'],
      },
      colors: {
        pageBg: "#0D0B14",
        cardBg: "#161320",
        sidebarBg: "#110F1C",
        primary: "#7C5CFC",
        secondary: "#4FC9A4",
        muted: "#8B899A",
        subtle: "#5A5870",
      },
    },
  },
  plugins: [],
};
export default config;

