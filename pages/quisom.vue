<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, app }) {
    const defaultLocale = app.i18n.locale
    const title = app.i18n.locale === 'ca' ? 'qui-som' : 'quienes-somos'
    const page = await $content(`${defaultLocale}/pages/${title}`).fetch()

    return {
      page,
    }
  },
}
</script>

<style></style>
