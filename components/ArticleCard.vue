<template>
  <article class="article-card has-shadow" :class="[size, language]">
    <nuxt-link
      :to="`/${$i18n.locale}/blog/${articleInfo.id}/${
        slug($i18n.locale) ? slug($i18n.locale) : slug('es')
      }/`"
    >
      <div class="img-container">
        <div class="overlay"></div>
        <img
          v-if="articleInfo.image"
          class="thumbnail"
          :src="articleInfo.image"
          alt=""
        />
      </div>
      <div class="card-inner">
        <p class="type">
          <span>{{ formatDate(articleInfo.createdAt) }}</span>
        </p>
        <h4 class="has-text-white">
          {{ fallbackTitle }}
        </h4>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import { fallbackContent } from '../utils/fallbackContent'

export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      size: 'two-thirds',
      language: ''
    }
  },
  computed: {
    fallbackTitle() {
      return fallbackContent(this.articleInfo, 'title', this.$i18n.locale)
    }
  },
  mounted() {
    const articleNo = this.index + 1
    this.language = this.$i18n.locale === 'es' ? '/es' : '/ca'
    this.size = 'one-third'

    // If is first or multiple of 10
    if (articleNo === 1) this.size = 'two-thirds'
    if (articleNo % 10 === 0) this.size = 'two-thirds'
  },
  methods: {
    title(lang) {
      const meta = this.articleInfo.translations.find(
        (article) => article.language === lang
      )
      return meta.title
    },
    slug(lang) {
      const meta = this.articleInfo.translations.find(
        (article) => article.language === lang
      )
      return meta.slug
    },
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [day, month, year].join('/')
    }
  }
}
</script>

<style lang="scss">
.article-card {
  border-radius: 0.5rem;
  background-color: #ecb500;
  padding: 1rem;
  margin-bottom: 2rem;
  min-height: 240px;
  position: relative;
  overflow: hidden;

  a {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    color: #fff;
    box-shadow: none;
    background: rgba(0, 0, 0, 0);
    transition: 0.2s ease all;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  // Sizes
  &.two-thirds {
    width: calc(66% - 1rem);

    @media (max-width: 567px) {
      width: 100%;
    }
  }
  &.one-third {
    width: calc(33% - 1rem);

    @media (max-width: 567px) {
      width: 100%;
    }
  }

  // Types
  &.vuejs {
    background-color: #3ab795;
  }
  &.react {
    background-color: #01baef;
  }
  &.js {
    background-color: #fff275;

    a {
      color: #252525;
    }
  }
  &.other {
    background-color: #ff8c42;

    a {
      color: #252525;
    }
  }

  .card-inner {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    padding: 0 1rem;
    z-index: 3;

    .type {
      background: rgba(0, 0, 0, 0.1);
      padding: 0.4rem;
      border-radius: 0.2rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      display: inline-block;
      line-height: 0.8rem;
    }
    h4 {
      margin-top: 0;
      margin-bottom: 0.25rem;
    }
  }
}
.img-container:hover img {
  transform: scale(1.2);
  transition: 0.3s transform ease-in-out;
}

.img-container {
  overflow: hidden;
  height: 240px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;

  img {
    z-index: 0;
    height: 240px;
    object-fit: cover;
    transition: 0.3s transform ease-in-out;
  }
}
.overlay {
  height: 240px;
  width: 100%;
  position: absolute;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.8)
  );
}
</style>
