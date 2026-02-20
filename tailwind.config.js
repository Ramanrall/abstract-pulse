/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg: '#060608',
        bg1: '#0d0d12',
        bg2: '#12121a',
        accent: '#7B61FF',
        accent2: '#00E5FF',
        accent3: '#FF6B6B',
        green: '#00D97E',
        yellow: '#FFD166',
        muted: '#6B6880',
        muted2: '#9896A8',
        tier: {
          bronze: '#CD7F32',
          silver: '#A8A9AD',
          gold: '#FFD700',
          platinum: '#00E5FF',
          diamond: '#B9F2FF',
        },
      },
    },
  },
  plugins: [],
};
