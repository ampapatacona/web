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
      <custom-pagination :total-pages="totalPages" :current-page="currentPage" @pagechanged="pagechanged"></custom-pagination>
    </custom-container>
  </section>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import CustomContainer from '~/components/CustomContainer'
import CustomPagination from '~/components/CustomPagination'
import getArticles from '~/queries/getArticles.gql'

export default {
  components: {
    ArticleCard,
    CustomContainer,
    CustomPagination
  },
  // async asyncData(context) {
  //   const { $content, app } = context
  //   const defaultLocale = app.i18n.locale
  //   const articlesPerPage = 5
  //   const totalPosts = await $content(`${defaultLocale}/blog`)
  //     .only(['title'])
  //     .fetch()

  //   const posts = await $content(`${defaultLocale}/blog`)
  //     .sortBy('date', 'desc')
  //     .limit(articlesPerPage)
  //     .fetch()
  //   return {
  //     totalPosts: totalPosts.length,
  //     articlesPerPage,
  //     currentPage: 1,
  //     posts: posts.map((post) => ({
  //       ...post,
  //       path: post.path.replace(`/${defaultLocale}`, '')
  //     }))
  //   }
  // },
  asyncData(context) {
    const client = context.app.apolloProvider.defaultClient
    const articlesPerPage = 5
    const variables = {
      type: 'article',
      limit: articlesPerPage,
      offset: 0
    }
    return client.query({ query: getArticles, variables }).then(({ data }) => {
      // console.log(data)
      return {
        posts: data.content,
        totalPosts: data.content_aggregate.aggregate.count,
        articlesPerPage,
        currentPage: 1
      }
      // do what you want with data
    })
  },
  computed: {
    totalPages() {
      const totalPages = this.totalPosts / this.articlesPerPage
      return Math.ceil(totalPages)
    }
  },
  methods: {
    refetch() {
      const skip = this.articlesPerPage * (this.currentPage - 1)
      const variables = {
        type: 'article',
        limit: this.articlesPerPage,
        offset: skip
      }
      return this.$apollo
        .query({ query: getArticles, variables })
        .then(({ data }) => {
          // console.log(data)
          this.posts = data.content
        })
    },
    pagechanged(page) {
      this.currentPage = page
      this.refetch()
    }
  }
}
</script>
