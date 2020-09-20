<template>
  <div class="login">
    <client-only :placeholder="$t('loading')">
      <firebase-ui />
    </client-only>
  </div>
</template>

<script>
import FirebaseUi from '~/components/FirebaseUi'

export default {
  name: 'Login',
  components: {
    FirebaseUi
  }
}
</script>
