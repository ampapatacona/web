<template>
  <Container>
    <div class="login">
      <client-only :placeholder="$t('loading')">
        <firebase-ui />
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
