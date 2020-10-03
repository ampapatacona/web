// import fs from 'fs'
// import path from 'path'

// function getPaths(lang, type) {
//   return fs
//     .readdirSync(path.resolve(__dirname, 'content', `${lang}/${type}`))
//     .filter((filename) => path.extname(filename) === '.md')
//     .map((filename) => `/${lang}/${type}/${path.parse(filename).name}/`)
// }

export default {
  target: 'static',
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  router: {
    trailingSlash: true,
    linkExactActiveClass: 'is-active'
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_DATABASE_URL: process.env.FB_DATABASE_URL,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUKET: process.env.FB_STORAGE_BUKET,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    SERVER_URL: process.env.SERVER_URL,
    GRAPH_HTTP_ENDPOINT: process.env.GRAPH_HTTP_ENDPOINT,
    GRAPH_WS_ENDPOINT: process.env.GRAPH_WS_ENDPOINT
  },

  buildModules: ['@nuxtjs/dotenv'],
  /*
   ** Headers of the page
   */
  head: {
    title: 'AMPA CEIP la Patacona',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: process.env.FACEBOOK_APP_ID
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'AMPA CEIP la Patacona'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Web del AMPA del CEIP La Patacona'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Web del AMPA del CEIP La Patacona'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'AMPA CEIP La Patacona'
      },
      {
        hid: 'og:article:author',
        property: 'og:article:author',
        content: 'https://github.com/jvmonjo'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'AMPA CEIP La Patacona'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'AMPA CEIP La Patacona'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'AMPA CEIP La Patacona'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /**
   * Plugins
   */
  plugins: [
    '~/plugins/lazyload',
    { src: '~/plugins/localStorage', mode: 'client' }
  ],

  /*
   ** Nuxt.js modules
   */

  modules: [
    '@nuxtjs/gtm',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    'nuxt-i18n',
    'vue-social-sharing/nuxt',
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],
  gtm: {
    id: 'GTM-5NRDZTZ'
  },
  apollo: {
    // Sets up the apollo client endpoints
    clientConfigs: {
      default: '~/plugins/apollo-config.js'
    },
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network'
      }
    }
  },
  axios: {
    baseURL: process.env.SERVER_URL
  },
  i18n: {
    locales: [
      {
        code: 'es',
        file: 'es.js'
      },
      {
        code: 'ca',
        file: 'ca.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'es',
    strategy: 'prefix',
    noPrefixDefaultLocale: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      onlyOnRoot: true
    }
  },

  /**
   * Google fonts
   */
  webfontloader: {
    google: {
      families: ['Rubik:400,700', 'Karla:400,700,400i,700i'] // Loads Lato font with weights 400 and 700
    }
  },

  /**
   * Font Awesome
   */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: [
          'faTwitter',
          'faInstagram',
          'faGithub',
          'faVuejs',
          'faReact',
          'faJs',
          'faDocker',
          'faWordpress',
          'faNodeJs',
          'faYarn',
          'faFacebook',
          'faWhatsapp',
          'faTelegramPlane',
          'faGoogle',
          'faTelegram'
        ]
      }
    ]
  },

  /**
   * Manifest
   */
  pwa: {
    manifest: {
      name: 'AMPA CEIP La Patacona',
      short_name: 'AMPA'
    },
    icon: {
      /* icon options */
    },
    workbox: {
      /* workbox options */
    }
  },

  /**
   * sitemap
   */
  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    exclude: ['/admin/'],
    trailingSlash: true
  },

  /**
   * Robots
   */
  robots: {
    UserAgent: '*',
    Disallow: '/admin'
  },

  /**
   * Transition
   */
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
  // generate: {
  //   routes: ['/es', '404']
  //     .concat(getPaths('es', 'blog'))
  //     .concat(getPaths('ca', 'blog'))
  // }
}
