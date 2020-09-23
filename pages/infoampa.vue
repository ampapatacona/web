<template>
  <article>
    <Container>
      <h1>{{ page.title }}</h1>
      <nuxt-content :document="page" />
    </Container>
  </article>
</template>

<script>
import TelegramButton from '@/components/TelegramButton'
import Container from '~/components/Container'

export default {
  components: { Container, TelegramButton },
  async asyncData({ $content, app }) {
    const defaultLocale = app.i18n.locale
    const title = 'infoampa'
    const page = await $content(`${defaultLocale}/pages/${title}`).fetch()

    return {
      page
    }
  }
}
</script>

<style></style>
