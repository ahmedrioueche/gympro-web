import { themes } from './src/lib/themeConfig';
// Helper function to flatten theme colors
const flattenThemeColors = (themes) => {
  const flattened = {};
  Object.entries(themes).forEach(([key, value]) => {
    flattened[key] = value; // Add each theme directly to colors
  });
  return flattened;
};

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: flattenThemeColors(themes), // Flatten the themes object
      fontFamily: {
        f1: ['Gelasio', 'serif'],
        f2: ['Satisfy', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
  darkMode: 'class',  
};

export default config;
