// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: [
      '@headlessui/vue'
    ],
  },
  css: [
    '@/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      PROJECT_ID: process.env.PROJECT_ID,
      GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    },
  },
});
