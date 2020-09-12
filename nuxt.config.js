import blogs from './content/blogs.json'

export default {
  mode: 'universal',
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'AMPA CEIP la Patacona',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'AMPA CEIP la Patacona',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Blog oficial del AMPA del CEIP La Patacona',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Blog oficial del AMPA del CEIP La PAtacona',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'AMPA CEIP La Patacona',
      },
      {
        hid: 'og:article:author',
        property: 'og:article:author',
        content: 'https://github.com/jvmonjo',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'AMPA CEIP La Patacona',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'AMPA CEIP La Patacona',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'AMPA CEIP La Patacona',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /**
   * Plugins
   */
  plugins: ['~/plugins/lazyload'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/google-tag-manager', { id: 'GTM-5NRDZTZ' }],
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    'nuxt-i18n',
    '@nuxtjs/bulma',
    'vue-social-sharing/nuxt',
  ],
  i18n: {
    locales: [
      {
        code: 'es',
        file: 'es.js',
      },
      {
        code: 'ca',
        file: 'ca.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ca',
  },

  /**
   * Google fonts
   */
  webfontloader: {
    google: {
      families: ['Rubik:400,700', 'Karla:400,700,400i,700i'], // Loads Lato font with weights 400 and 700
    },
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
        ],
      },
    ],
  },

  /**
   * Manifest
   */
  manifest: {
    name: 'AMPA CEIP La Patacona',
    short_name: 'AMPA',
    lang: 'en',
  },

  /**
   * sitemap
   */
  sitemap: {
    hostname: 'https://ceiplapatacona.netlify.app',
    gzip: true,
    exclude: ['/admin/'],
  },

  /**
   * Robots
   */
  robots: {
    UserAgent: '*',
    Disallow: '/admin',
  },

  /**
   * Generate config
   */
  generate: {
    routes: [].concat(blogs.map((blog) => `/blog/${blog.slug}`)),
  },

  /**
   * Transition
   */
  transition: {
    name: 'fade',
    mode: 'out-in',
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
          customProperties: false,
        },
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true,
        },
      })
    },
  },
}
