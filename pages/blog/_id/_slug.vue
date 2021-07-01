<template>
  <section id="shareable" class="post">
    <custom-container class="meta-section">
      <h1>{{ fallbackContent(post, 'title') }}</h1>
      <p class="post-meta">
        {{ $t('blog.publicat', { date: created }) }}
        <span v-if="post.author && post.author.firstname">
          {{ $t('blog.per') }}
          {{ post.author.firstname }}</span
        >
      </p>
      <p
        v-if="fallbackContent(post, 'title', 'ca') && lang === 'es'"
        style="font-size: 0.8rem"
        class="post-meta"
      >
        Versió en
        <nuxt-link
          :to="`/ca/blog/${post.id}/${fallbackContent(post, 'slug', 'ca')}/`"
          >valencià</nuxt-link
        >
      </p>
      <p
        v-if="fallbackContent(post, 'title', 'es') && lang === 'ca'"
        style="font-size: 0.8rem"
        class="post-meta"
      >
        Versión en
        <nuxt-link
          :to="`/es/blog/${post.id}/${fallbackContent(post, 'slug', 'es')}/`"
          >castellano</nuxt-link
        >
      </p>
    </custom-container>
    <div
      v-if="post.image"
      class="cover-image"
      :style="`background-image: url(${post.image})`"
    ></div>
    <custom-container narrow>
      <p class="post-meta" style="font-size: 0.8rem">
        {{ $t('blog.actualitzat', { date: updated }) }}
      </p>

      <!-- eslint-disable vue/no-v-html -->
      <div
        class="post-content has-background-white has-shadow p-4"
        v-html="content[lang] ? content[lang] : content['es']"
      ></div>
      <p>{{ $t('blog.comparteix') }}</p>
      <div class="share-network-list columns is-multiline">
        <ShareNetwork
          v-for="network in networks"
          :key="network.network"
          :network="network.network"
          :style="{ backgroundColor: network.color }"
          :url="$config.baseURL + $route.fullPath"
          :title="title[lang] ? title[lang] : title['es']"
          hashtags="ampa,patacona"
          class="column is-one-quarter button is-vcentered"
          style="
            white-space: nowrap;
            display: inline-block;
            padding: 0;
            padding-top: 7px;
          "
        >
          <font-awesome-icon
            style="margin-right: 0; margin-left: 8px"
            :icon="['fab', network.icon]"
          />
          <span>{{ network.name }}</span>
        </ShareNetwork>
      </div>
    </custom-container>
  </section>
</template>

<script>
import Prism from 'prismjs'
import shareThis from 'share-this'
import * as twitterSharer from 'share-this/dist/sharers/twitter'
import * as facebookSharer from 'share-this/dist/sharers/facebook'
import * as redditSharer from 'share-this/dist/sharers/reddit'
import { fallbackContent } from '@/utils/fallbackContent'
import getArticleById from '@/queries/getArticleById.gql'

import CustomContainer from '~/components/CustomContainer'

export default {
  name: 'Blog',
  components: {
    CustomContainer
  },
  asyncData(context) {
    function formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [day, month, year].join('/')
    }
    const client = context.app.apolloProvider.defaultClient
    const variables = {
      id: Number(context.params.id)
    }
    return client
      .query({ query: getArticleById, variables })
      .then(({ data }) => {
        // console.log(data)
        const post = data.content_by_pk
        // post.created_at = formatDate(post.created_at)
        // post.updated_at = formatDate(post.updated_at)
        return {
          post,
          created: formatDate(post.createdAt),
          updated: formatDate(post.updatedAt),
          title: {
            es: post.translations.find((article) => article.language === 'es')
              .title,
            ca: post.translations.find((article) => article.language === 'ca')
              .title
          },
          content: {
            es: post.translations.find((article) => article.language === 'es')
              .content,
            ca: post.translations.find((article) => article.language === 'ca')
              .content
          },
          slug: {
            es: post.translations.find((article) => article.language === 'es')
              .slug,
            ca: post.translations.find((article) => article.language === 'ca')
              .slug
          },
          lang: context.app.i18n.locale,
          networks: [
            {
              network: 'email',
              name: 'Email',
              icon: 'google',
              color: '#333333'
            },
            {
              network: 'facebook',
              name: 'Facebook',
              icon: 'facebook',
              color: '#1877f2'
            },

            {
              network: 'telegram',
              name: 'Telegram',
              icon: 'telegram-plane',
              color: '#0088cc'
            },
            {
              network: 'twitter',
              name: 'Twitter',
              icon: 'twitter',
              color: '#1da1f2'
            },
            {
              network: 'whatsapp',
              name: 'Whatsapp',
              icon: 'whatsapp',
              color: '#25d366'
            }
          ]
        }
      })
  },
  mounted() {
    Prism.highlightAll()

    const selectionShare = shareThis({
      selector: '#shareable',
      sharers: [twitterSharer, facebookSharer, redditSharer]
    })

    selectionShare.init()
  },
  methods: {
    fallbackContent(content, field = 'title', lang = this.$i18n.locale) {
      return fallbackContent(content, field, lang)
    },
    share() {
      const selectionShare = shareThis({
        selector: '#shareable',
        sharers: [twitterSharer, facebookSharer, redditSharer]
      })

      return selectionShare.init()
    }
  },
  head() {
    return {
      title: `${
        this.title[this.lang] ? this.title[this.lang] : this.title.es
      } | AMPA CEIP La Patacona`,
      meta: [
        {
          hid: 'article:published_time',
          property: 'article:published_time',
          content: this.post.date
        },
        {
          hid: 'article:modified_time',
          property: 'article:modified_time',
          content: this.post.update
        },
        {
          hid: 'og:updated_time',
          property: 'og:updated_time',
          content: this.post.update
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.BASE_URL}/${this.lang}/blog/${this.post.id}/${
            this.slug[this.lang]
          }/`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${
            this.title[this.lang] ? this.title[this.lang] : this.title.es
          } | AMPA CEIP La Patacona`
        },
        {
          hid: 'description',
          name: 'description',
          content: this.title[this.lang]
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.title[this.lang]
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.image
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title[this.lang] ? this.title[this.lang] : this.title.es
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:article:author',
          property: 'og:article:author',
          content:
            this.post && this.post.author ? this.post.author.firstName : ''
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title[this.lang] ? this.title[this.lang] : this.title.es
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@tribe_code'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.title[this.lang] ? this.title[this.lang] : this.title.es
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post.image
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.cover-image {
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  margin-bottom: 2rem;
}

.post-content {
  padding: 1.5rem;
}
.share-this-popover {
  animation: share-this 360ms forwards linear;

  &::before {
    border-color: #252525 transparent;
    border-style: solid;
    border-width: 0.4em 0.4em 0;
    bottom: 100%;
    content: '';
    height: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    position: absolute;
    width: 0;
  }

  ul {
    background-color: #252525;
    border-radius: 0.5rem;
    transform: translate(-50%, -110%);
    background: linear-gradient(to bottom, rgba(49, 49, 47, 0.99), #252525);
    padding: 0;
    margin: 0;
    display: inline-block;
    color: #fff;
    left: 50%;
    display: flex;
    list-style: none;
    position: absolute;
    white-space: nowrap;
    padding: 0.5rem 0.7rem;

    li {
      display: inline-block;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      margin: 0;
      padding: 0 0.4rem;
      width: 2rem;

      &:first-child {
        padding-left: 0;
        width: 1.6rem;
      }
      &:last-child {
        padding-right: 0;
        width: 1.6rem;
      }

      a {
        color: #fff;
        box-shadow: none;
        display: block;
      }
    }
  }
}

.post {
  .meta-section,
  .thumbnail {
    margin-bottom: 2.4rem;
  }

  .thumbnail {
    width: 100%;
    height: auto;
  }

  .meta-section {
    text-align: center;
    display: block;

    .post-meta {
      margin: 0;
      color: #535353;
      font-weight: 700;
    }
  }
  h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    display: block;
    width: 100%;
  }
}

@keyframes share-this {
  0% {
    opacity: 0;
    -webkit-transform: matrix(0.97, 0, 0, 1, 0, 12);
    transform: matrix(0.97, 0, 0, 1, 0, 12);
  }
  20% {
    opacity: 0.7;
    -webkit-transform: matrix(0.99, 0, 0, 1, 0, 2);
    transform: matrix(0.99, 0, 0, 1, 0, 2);
  }
  40% {
    opacity: 1;
    -webkit-transform: matrix(1, 0, 0, 1, 0, -1);
    transform: matrix(1, 0, 0, 1, 0, -1);
  }
  70% {
    opacity: 1;
    -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}
.share-network-list * {
  margin-right: 1rem;
  color: white;
  font-size: 0.8rem;
}
</style>
