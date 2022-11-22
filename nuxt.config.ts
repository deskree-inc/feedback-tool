// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    '~~': '/',
    '@@': '/',
    '~': '/',
    '@': '/src',
    assets: '/src/assets',
    public: '/public',
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  publicRuntimeConfig: {
    PROJECT_ID: process.env.PROJECT_ID,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  },
});
