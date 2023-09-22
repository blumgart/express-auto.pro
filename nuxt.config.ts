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

      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicons/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicons/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
        { rel: "shortcut icon", href: "/favicons/favicon.ico" },
      ],

      meta: [
        { name: "msapplication-TileColor", content: "#ffd700" },
        { name: "msapplication-config", content: "/favicon/browserconfig.xml" },
        { name: "theme-color", content: "#ffffff" },
      ],
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

  runtimeConfig: {
    apiBase: "http://express-auto.declanj1.beget.tech/api/v1",
    resendApiKey: "re_42MiMgrw_EZaGxMpUkSjxaNTS9Sgp7kHh",

    public: {
      backendUrl: "http://express-auto.declanj1.beget.tech",
    },
  },
});
