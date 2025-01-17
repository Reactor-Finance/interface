import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geistMono: ["var(--font-geist-mono)"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        ["light-blue"]: {
          100: "hsl(var(--gray-100), <alpha-value>)",
          600: "hsl(var(--gray-600), <alpha-value>)",
        },
        ["purple"]: {
          100: "hsl(var(--gray-100), <alpha-value>)",
          600: "hsl(var(--gray-600), <alpha-value>)",
        },
        ["red"]: {
          100: "hsl(var(--gray-100), <alpha-value>)",
          600: "hsl(var(--gray-600), <alpha-value>)",
        },
        ["green"]: {
          100: "hsl(var(--gray-100), <alpha-value>)",
          600: "hsl(var(--gray-600), <alpha-value>)",
        },
        ["yellow"]: {
          100: "hsl(var(--gray-100), <alpha-value>)",
          600: "hsl(var(--gray-600), <alpha-value>)",
        },
        gray: {
          100: "hsl(var(--gray-100), <alpha-value>)",
          200: "hsl(var(--gray-200), <alpha-value>)",
          300: "hsl(var(--gray-300), <alpha-value>)",
          400: "hsl(var(--gray-400), <alpha-value>)",
          500: "hsl(var(--gray-500), <alpha-value>)",
          600: "hsl(var(--gray-600), <alpha-value>)",
          700: "hsl(var(--gray-700), <alpha-value>)",
          800: "hsl(var(--gray-800), <alpha-value>)",
          900: "hsl(var(--gray-900), <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
