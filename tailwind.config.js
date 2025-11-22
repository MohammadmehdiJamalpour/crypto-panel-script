// tailwind.config.js (ESM for Vite)
const withOpacity = (variable) => {
  return ({ opacityValue } = {}) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        70: "0.70",
        65: "0.65",
        60: "0.60",
        135: "1.35",
        150: "1.5",
      },
      screens: {
        "3xl": "1920px",
      },
      opacity: {
        56: "0.56",
      },
      colors: {
        primary: withOpacity("--primary-rgb"),
        "primary-56": "rgb(var(--primary-rgb) / 0.56)",
        "hover-start": withOpacity("--hover-start-rgb"),
        "hover-end": withOpacity("--hover-end-rgb"),
      },
      backgroundImage: {
        "hover-radial":
          "radial-gradient(120% 120% at 10% -10%, rgb(var(--hover-start-rgb) / var(--hover-alpha)) 0%, rgb(var(--hover-end-rgb) / var(--hover-alpha)) 100%)",
      },
    },
  },
  plugins: [],
};
