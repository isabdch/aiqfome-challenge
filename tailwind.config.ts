import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#7B1FA2",

        "decorative-dividers-gray": "#CDD1D9",
        "decorative-icons-gray": "#A8ADB7",

        "text-light": "#6D6F73",
        "text-purple": "#580F78",

        "neutral-0": "#ffffff",
        "neutral-50": "#F5F6F9",
        "neutral-100": "#EEF0F5",
        "neutral-200": "#CDD1D9",
        "neutral-400": "#A8ADB7",
        "neutral-500": "#6D6F73",
        "neutral-700": "#393A3C",
        "neutral-900": "#202326",
        "neutral-999": "#000000",

        "yellow-500": "#FFB300",

        "purple-200": "#EECFFC",
        "purple-500": "#7B1FA2",
        "purple-700": "#580F78",

        "teal-50": "#F2FAFA",
        "teal-400": "#00A296",
        "teal-600": "#027A7A",

        "green-500": "#02A117",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)"],
      },
      spacing: {
        xs: "2px",
        "2xs": "3px",
        "3xs": "4px",
        "4xs": "5px",
        sm: "8px",
        "2sm": "10px",
        "3sm": "12px",
        md: "16px",
        "2md": "18px",
        "3md": "20px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "56px",
        "5xl": "64px",
      },
      fontSize: {
        xs: ["12px", "normal"],
        "2xs": ["14px", "19px"],
        md: ["16px", "normal"],
        lg: ["20px", "normal"],
      },
    },
  },
  plugins: [],
};

export default config;
