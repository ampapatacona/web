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
    const posts = await $content(`${defaultLocale}/blog`).fetch()
    return {
      posts: posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${defaultLocale}`, ''),
      })),
    }
  },
  // async asyncData({ app }) {
  //   async function awaitImport(blog) {
  //     const wholeMD = await import(`~/content/blog/${blog.slug}.md`)
  //     return {
  //       attributes: wholeMD.attributes,
  //       link: blog.slug,
  //     }
  //   }

  //   const blogList = await Promise.all(
  //     blogs.map((blog) => awaitImport(blog))
  //   ).then((res) => {
  //     return {
  //       blogList: res,
  //     }
  //   })

  //   return blogList
  // },
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
