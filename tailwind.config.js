import { themes } from './src/utils/themeConfig';
import scrollbarPlugin from 'tailwind-scrollbar';
import scrollbarHide from 'tailwind-scrollbar-hide';

// Helper function to flatten theme colors
const flattenThemeColors = themes => {
  const flattened = {};
  Object.entries(themes).forEach(([key, value]) => {
    flattened[key] = value; // Add each theme directly to colors
  });
  return flattened;
};

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: flattenThemeColors(themes), // Flatten the themes object
      fontFamily: {
        f1: ['Gelasio', 'serif'],
        f2: ['Satisfy', 'serif'],
      },
      scrollbar: {
        // Customize scrollbar width and track/thumb colors
        width: '12px', // Adjust scrollbar width
        track: {
          light: '#E0E0E0', // Light mode track color
          dark: '#333333', // Dark mode track color
        },
        thumb: {
          light: '#a0a0a0', // Light mode thumb color
          dark: '#555555', // Dark mode thumb color
          hover: '#808080', // Hover color for thumb
        },
      },
    },
  },
  plugins: [
    scrollbarHide,
    scrollbarPlugin({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
  ],
  darkMode: 'class',
};

export default config;
