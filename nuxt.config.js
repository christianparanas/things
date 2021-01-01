export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Random Stuffs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "@/plugins/vClickOutside", ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/firebase',
    ['cookie-universal-nuxt', { parseJSON: false }]
  ],

  pwa: {
   manifest: {
      name: 'christianparanas',
      background_color: '#091a28'
    },
    icon: {
         fileName: 'favicon.ico',
    }
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyDtP9Nu0qBEFUQO6IKML87_cimFivW0Tj8',
      authDomain: 'things-dc9ef.firebaseapp.com',
      projectId: 'things-dc9ef',
      storageBucket: 'things-dc9ef.appspot.com',
      messagingSenderId: '960500097488',
      appId: '1:960500097488:web:6a1b99a1d83d6de96859d5',
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      firestore: true,
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
