/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/nuxt.config.{js,ts}',
    './src/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        deskree: {
          300: '#6BA6FF',
          500: '#5E8CFF',
          600: '#4A7DFF',
        },
      },
      borderRadius: {
        md: '4px',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
