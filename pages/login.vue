<template>
  <custom-container>
    <div class="login">
      <h1 class="has-text-centered">Login</h1>
      <client-only :placeholder="$t('loading')">
        <firebase-ui :message="$t('login.enter')" />
      </client-only>
    </div>
  </custom-container>
</template>

<script>
import FirebaseUi from '~/components/FirebaseUi'
import CustomContainer from '~/components/CustomContainer'

export default {
  name: 'Login',
  components: {
    FirebaseUi,
    CustomContainer
  }
}
</script>
