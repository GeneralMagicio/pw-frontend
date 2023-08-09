/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'screen-content': 'calc(100vh - 177.45px)',
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        'gray-4': 'var(--gray-4)',
        'gray-10': 'var(--gray-10)',
        'gray-20': 'var(--gray-20)',
        'gray-30': 'var(--gray-30)',
        'gray-50': 'var(--gray-50)',
        dark: 'var(--bd-color)',
        red: 'var(--red)',
        black: 'var(--text-black)',
        'black-30': 'var(--black-30)',
      },
      fontFamily: {
        IBM: ['var(--font-IBM)'],
        Inter: ['var(--font-Inter)'],
      },
    },
  },
  plugins: [],
}
