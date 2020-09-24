<template>
  <article>
    <custom-container>
      <h1>{{ page.title }}</h1>
      <nuxt-content :document="page" />
    </custom-container>
  </article>
</template>

<script>
import CustomContainer from '~/components/CustomContainer'
export default {
  components: { CustomContainer },
  async asyncData({ $content, app }) {
    const defaultLocale = app.i18n.locale
    const title =
      app.i18n.locale === 'ca'
        ? 'politica-de-privacitat'
        : 'politica-de-privacidad'
    const page = await $content(`${defaultLocale}/pages/${title}`).fetch()

    return {
      page
    }
  }
}
</script>

<style></style>
