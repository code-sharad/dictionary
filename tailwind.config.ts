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
          50: '#F5F7FA', // Platinum
          100: '#E5E9F0',
          200: '#D2D6DC',
          300: '#B7BBC4',
          400: '#A0A7B9',
          500: '#8B94A2', // Premium Steel
          600: '#7C8393',
          700: '#5B5F67',
          800: '#41434A',
          900: '#222327',
        },
        secondary: {
          50: '#FAF6F2', // Champagne
          100: '#F5ECD8',
          200: '#E9DBBB',
          300: '#D5C093',
          400: '#AE925C',
          500: '#968047', // Premium Bronze
          600: '#706337',
          700: '#524925',
          800: '#38301A',
          900: '#231D10',
        },
        accent: '#CDA434', // premium gold
        neutral: '#21242b', // sleek premium dark
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
