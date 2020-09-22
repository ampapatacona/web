<template>
  <main>
    <Container>
      <h1>{{ $t('areaSocis.title') }}</h1>
      <p>{{ $t('construccio') }}</p>
    </Container>
  </main>
</template>

<script>
import Container from '~/components/Container'
export default {
  name: 'AppIndex',
  components: {
    Container
  },
  middleware: 'auth'
}
</script>

<style></style>
