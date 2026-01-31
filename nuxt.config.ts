// nuxt.config.ts
export default defineNuxtConfig({
  // ✅ Fix build failing because of prerender
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
    },
  },

  typescript: {
    shim: false,
  },

  css: ["@/assets/styles/main.scss", "swiper/css"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_utils.scss" as *;',
          api: "modern-compiler",
        },
      },
    },
  },

  app: {
    head: {
      charset: "utf-8",
      title: "Sami Marketing",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
        { name: "theme-color", content: "#0e0e0e" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image:width", content: "600" },
        { property: "og:image:height", content: "314" },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:site_name", content: "Sami Marketing" },
        { property: "og:type", content: "website" },
        { name: "title", content: "Sami Marketing" },
        { name: "description", content: "We are a fearless team with bold ideas" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "canonical", href: "https://samitraffic.com/" },
      ],
    },
  },

  /**
   * ВАЖЛИВО:
   * - server/api/* у тебе зараз читає config.strapi.url → тому тримаємо "strapi" на верхньому рівні
   * - у браузері/компонентах треба public.* → тому дублюємо також у public
   * - TG_* лишаємо приватними (лише сервер)
   */
  runtimeConfig: {
    TG_CHAT: process.env.TG_CHAT,
    TG_TOKEN: process.env.TG_TOKEN,
    TG_CHAT2: process.env.TG_CHAT2,
    TG_TOKEN2: process.env.TG_TOKEN2,

    // ✅ для server routes (server/api/*)
    strapi: {
      url: process.env.API || "http://localhost:1337",
    },

    // ✅ для клієнта (browser)
    public: {
      siteUrl: process.env.SITE_URL || "https://samitraffic.com",
      strapi: {
        url: process.env.API || "http://localhost:1337",
      },
    },
  },

  devServer: {
    port: 6969,
    host: "0.0.0.0",
  },

  compatibilityDate: "2025-02-19",

  modules: ["@nuxtjs/i18n", "@nuxtjs/sitemap"],

  sitemap: {
    siteUrl: "https://samitraffic.com",
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: "weekly",
    },
  },

  i18n: {
    // ⚠️ module resolves langDir relative to the vueI18n config dir (/i18n)
    // so we point to ../locales
    langDir: "../locales",
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "ua", language: "uk-UA", file: "ua.json" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: false,
    vueI18n: "./i18n/i18n.config.ts",
  },
})
