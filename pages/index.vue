<template>
  <section>
    <custom-container>
      <div class="intro">
        <h1>AMPA CEIP La Patacona</h1>
      </div>
    </custom-container>
    <custom-container flex>
      <!-- eslint-disable prettier/prettier -->
      <article-card
        v-for="(blog, index) in posts"
        :key="index"
        :index="index"
        :article-info="blog"
      ></article-card>
    </custom-container>
    <custom-container flex>
      <!-- <custom-pagination :total-pages="totalPages" :current-page="currentPage" @pagechanged="pagechanged"></custom-pagination> -->
    </custom-container>
  </section>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import CustomContainer from '~/components/CustomContainer'
import CustomPagination from '~/components/CustomPagination'

export default {
  components: {
    ArticleCard,
    CustomContainer,
    CustomPagination
  },
  async asyncData(context) {
    const { $content, app } = context
    const defaultLocale = app.i18n.locale
    const articlesPerPage = 5
    const totalPosts = await $content(`${defaultLocale}/blog`)
      .only(['title'])
      .fetch()

    const posts = await $content(`${defaultLocale}/blog`)
      .sortBy('date', 'desc')
      .limit(articlesPerPage)
      .fetch()
    return {
      totalPosts: totalPosts.length,
      articlesPerPage,
      currentPage: 1,
      posts: posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${defaultLocale}`, '')
      }))
    }
  },
  computed: {
    totalPages() {
      const totalPages = this.totalPosts / this.articlesPerPage
      return Math.ceil(totalPages)
    }
  },
  methods: {
    async refetch() {
      const skip = this.articlesPerPage * (this.currentPage - 1)
      const defaultLocale = this.$i18n.locale
      const posts = await this.$content(`${defaultLocale}/blog`)
        .sortBy('date', 'desc')
        .limit(this.articlesPerPage)
        .skip(skip)
        .fetch()
      this.posts = posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${defaultLocale}`, '')
      }))
    },
    pagechanged(page) {
      this.currentPage = page
      this.refetch()
    }
  }
}
</script>
