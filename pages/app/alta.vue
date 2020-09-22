<template>
  <Container>
    <div class="login">
      <h1 class="has-text-centered">{{ $t('alta.title') }}</h1>
      <client-only :placeholder="$t('loading')">
        <firebase-ui :message="$t('login.register')" />
      </client-only>
    </div>
  </Container>
</template>

<script>
import FirebaseUi from '~/components/FirebaseUi'
import Container from '~/components/Container'

export default {
  name: 'Login',
  components: {
    FirebaseUi,
    Container
  }
}
</script>
