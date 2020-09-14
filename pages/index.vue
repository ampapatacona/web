<template>
  <section>
    <Container>
      <div class="intro">
        <h1>AMPA CEIP La Patacona</h1>
      </div>
    </Container>
    <Container flex>
      <ArticleCard
        v-for="(blog, index) in posts"
        :key="index"
        :index="index"
        :article-info="blog"
      />
    </Container>
  </section>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import Container from '~/components/Container'

// import blogs from '~/content/blogs.json'

export default {
  components: {
    ArticleCard,
    Container,
  },
  async asyncData(context) {
    const { $content, app } = context
    const defaultLocale = app.i18n.locale
    const posts = await $content(`${defaultLocale}/blog`)
      .sortBy('date', 'desc')
      .fetch()
    return {
      posts: posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${defaultLocale}`, ''),
      })),
    }
  },
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
