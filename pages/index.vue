<template>
  <section>
    <Container>
      <div class="intro">
        <h1>AMPA CEIP La Patacona</h1>
      </div>
    </Container>
    <Container flex>
      <!-- eslint-disable prettier/prettier -->
      <ArticleCard
        v-for="(blog, index) in posts"
        :key="index"
        :index="index"
        :article-info="blog"
      />
    </Container>
    <Container flex>
      <Pagination :total-pages="totalPages" :current-page="currentPage" @pagechanged="pagechanged" />
    </Container>
  </section>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import Container from '~/components/Container'
import Pagination from '~/components/Pagination'

export default {
  components: {
    ArticleCard,
    Container,
    Pagination
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
      this.posts = await this.$content(`${defaultLocale}/blog`)
        .sortBy('date', 'desc')
        .limit(this.articlesPerPage)
        .skip(skip)
        .fetch()
    },
    pagechanged(page) {
      this.currentPage = page
      this.refetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  text-align: center;
  margin-bottom: 2.4rem;

  h1 {
    margin-top: 0;
  }
}
</style>
