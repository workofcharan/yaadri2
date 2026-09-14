/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FAF8F3',
          100: '#FEF3C7',
          700: '#B45309',
          900: '#78350F',
        },
        rose: {
          50: '#FDF2F8',
          100: '#FFE4E6',
          400: '#F472B6',
          600: '#E11D48',
        },
        emerald: {
          50: '#ECFDF5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        teal: {
          50: '#F0FDFA',
          400: '#2DD4BF',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
