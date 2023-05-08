// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    OPENAI_API_KEY: "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",
  },
  ssr: false,
});
