import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f7f3eb',
        leaf: '#d7edc2',
        bark: '#6f5e49',
        root: '#425b3b',
        branch: '#7aa16a',
        accent: '#c86d4b',
        bloom: '#f4d6df'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(74, 59, 38, 0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
