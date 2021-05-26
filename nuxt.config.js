export default {
  target: 'static',
  router: {
    base: '/bw-accidents/'
  },
  generate: {
    fallback: true
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bw-accidents',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-apexcharts.js', ssr: false },
    { src: '~plugins/leaflet.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.NUXT_APP_FIREBASE_API_KEY,
          authDomain: process.env.NUXT_APP_AUTH_DOMAIN,
          projectId: process.env.NUXT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NUXT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NUXT_APP_FIREBASE_MESSAGE_SENDER_ID,
          appId: process.env.NUXT_APP_FIREBASE_APP_ID,
          measurementId: process.env.NUXT_APP_FIREBASE_MEASUREMENT_ID
        },
        services: {
          firestore: { ssr: true},
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
