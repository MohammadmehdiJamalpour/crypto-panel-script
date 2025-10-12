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
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       scale: {
        70: '0.70',
        65: '0.65',
        60: '0.60',
      },
      // Optional: add a named 56% step so you can use `/56`
      opacity: {
        56: '0.56',
      },
      colors: {
        // Enables bg-primary, text-primary, border-primary, and `/opacity` suffixes
        primary: withOpacity('--primary-rgb'),

        // If you still want a fixed 56% alias:
        'primary-56': 'rgb(var(--primary-rgb) / 0.56)',
      },
    },
  },
  plugins: [],
};
