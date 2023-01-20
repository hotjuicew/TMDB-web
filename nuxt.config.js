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
        name: 'zhIndex',
        path: '/zh',
        component: 'pages/index.vue'
      },
      {
        name: 'enIndex',
        path: '/en',
        component: 'pages/index.vue'
      },
      {
        name: 'zhTv',
        path: '/zh/tv',
        component: 'pages/tv/index.vue'
      },
      {
        name: 'enTv',
        path: '/en/tv',
        component: 'pages/tv/index.vue'
      },

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

      // {
      //   name: 'movie-category-name',
      //   path: '/movie/category/:name',
      //   component: 'pages/movie/category/_name.vue'
      // }
      {
        name: 'zh-movie-category-name',
        path: '/zh/movie/category/:name',
        component: 'pages/movie/category/_name.vue'
      },

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{
    src: "tailwindcss/tailwind.css"
  },],

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
    '@nuxtjs/axios','@nuxtjs/i18n'

  ],
  i18n: {
    locales: ['en', 'zh'],
    routesNameSeparator: '-',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./lang/en.js'),
        zh: require('./lang/zh.js')
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // axios 在发送请求时，将使用相对 URL。
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // postcss: {
    //   config: {
    //     path: './postcss.config.js'
    //   }
    // }
  },
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
