/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'screen-content': 'calc(100vh - 176px)',
      },
    },
  },
  plugins: [],
}
