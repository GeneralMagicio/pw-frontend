/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'screen-content': 'calc(100vh - 177.45px)',
      },
      colors: {
        'gray-4': 'var(--gray-4)',
        'gray-10': 'var(--gray-10)',
        'gray-30': 'var(--gray-30)',
        'gray-50': 'var(--gray-50)',
        dark: 'var(--bd-color)',
        red: 'var(--red)',
        black: 'var(--text-black)',
      },
      fontFamily: {
        IBM: ['var(--font-IBM)'],
        Inter: ['var(--font-Inter)'],
      },
    },
  },
  plugins: [],
}
