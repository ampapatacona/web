<template>
  <div class="site-wrapper">
    <main id="main" class="main" role="main">
      <div v-if="error && error.statusCode === 404">
        <h1>Error 404</h1>
        <p>{{ $t('error.noTrobat') }}</p>
      </div>
      <div v-else>
        <h1>An error occurred</h1>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss"></style>
