<template>
  <Container>
    <div class="login">
      <h1 class="has-text-centered">Login</h1>
      <client-only :placeholder="$t('loading')">
        <firebase-ui :message="$t('login.enter')" />
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
