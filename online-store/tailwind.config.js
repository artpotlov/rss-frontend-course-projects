/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html, ts}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}