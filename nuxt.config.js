export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tmdb-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    routes: [
      {
        name: 'search',
        path: '/search',
        component: 'pages/search/index.vue'
      },
      {
        name: 'tvSearch',
        path: '/tv/search',
        component: 'pages/tv/search/index.vue'
      },
      {
        name: 'movieSearch',
        path: '/movie/search',
        component: 'pages/movie/search/index.vue'
      },
      {
        name: 'personSearch',
        path: '/person/search',
        component: 'pages/person/search/index.vue'
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/global.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/lazyload.js", "~/plugins/filters.js",],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // axios 在发送请求时，将使用相对 URL。
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  loaders: {
    cssModules: {
      camelCase: true,// CSS 模块中的类名会被转换为驼峰命名法
      localIdentName: "[local]_[hash:base64:5]",// CSS 模块中类名的命名方式
    },
  },
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    API_KEY: process.env.API_KEY || "",
    API_LANG: process.env.API_LANG || "en-US",
    API_COUNTRY: process.env.API_COUNTRY || "GB",
    API_YOUTUBE_KEY: process.env.API_YOUTUBE_KEY || "",
    GA: process.env.GA || "",
  },

  // 加载指示器的颜色
  loading: {
    color: "#2196f3",
  },
    dev:{
    errorOverlay:true
  },
  ssr: false,

}
