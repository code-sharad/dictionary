import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F2EFE6',
          100: '#E2DAC2',
          200: '#D0BD97',
          300: '#BC9D6A',
          400: '#AD854B',
          500: '#9D6A2A',
          600: '#886025',
          700: '#63481C',
          800: '#4A3916',
          900: '#2A230B',
        },
        secondary: {
          50: '#F4F0FF',
          100: '#E4DAFA',
          200: '#C2B0F2',
          300: '#A287E8',
          400: '#7B58CF',
          500: '#5F40A6',
          600: '#463083',
          700: '#2F2058',
          800: '#1C1335',
          900: '#100A1B',
        },
        accent: '#FFD700', // gold
        neutral: '#1F2128', // premium dark
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],

};
export default config;
