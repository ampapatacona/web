<template>
  <main>
    <custom-container>
      <h1>{{ $t('areaSocis.title') }}</h1>
      <p>{{ $t('construccio') }}</p>
    </custom-container>
  </main>
</template>

<script>
import CustomContainer from '~/components/CustomContainer'
export default {
  name: 'AppIndex',
  components: {
    CustomContainer
  },
  middleware: 'auth'
}
</script>

<style></style>
