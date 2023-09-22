// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {},
  $development: {},

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        class: "scroll-smooth",
      },
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@hypernym/nuxt-anime",
    "nuxt-headlessui",
  ],

  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
    preload: true,
  },

  headlessui: {
    prefix: "Headless",
  },
});
