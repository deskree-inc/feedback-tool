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
        'blue-rgba': 'rgba(78, 128, 255, 0.3)',
        'hover-rgba': 'rgba(255, 255, 255, 0.08)',
      },
      borderRadius: {
        md: '4px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-in',
        'fade-out-down': 'fade-out-down 0.6s ease-out',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
