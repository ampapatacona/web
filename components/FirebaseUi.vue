<template>
  <div>
    <div id="firebaseui-auth-container" />
    <div v-if="loading" class="loader-wrapper">
      <div class="loader is-loading"></div>
    </div>
  </div>
</template>

<script>
import { auth, authProviders } from '~/plugins/firebase'

export default {
  name: 'Login',
  props: {
    message: {
      type: String,
      default: 'Entra con'
    }
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    if (process.browser) {
      let firebaseUILoader
      const vm = this
      const locale = this.$i18n.locale

      if (locale === 'es') {
        firebaseUILoader = import('~/static/js/npm__es')
      } else {
        firebaseUILoader = import('~/static/js/npm__ca')
      }

      firebaseUILoader.then((firebaseui) => {
        // You can use FirebaseUI here.

        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(auth)

        const config = {
          signInOptions: [
            {
              provider: authProviders.email,
              fullLabel: `${vm.message} email`
            },
            {
              provider: authProviders.Google,
              fullLabel: `${vm.message} Google`
            }
          ],
          signInSuccessUrl: '/',
          tosUrl: '/tos/',
          credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
          privacyPolicyUrl: '/privacy-policy/',
          callbacks: {
            signInSuccessWithAuthResult() {
              // console.log('signInSuccessWithAuthResult')
              vm.$store.dispatch('AUTH_CHECK')
            },
            uiShown() {
              // console.log('uiShown')
              vm.loading = false
            }
          }
        }

        ui.start('#firebaseui-auth-container', config)
      })
    }
  }
}
</script>

<style lang="scss">
.loader-wrapper {
  background: transparent;
  z-index: -1;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  .loader {
    height: 80px;
    width: 80px;
    margin: 0 auto;
  }

  &.is-active {
    opacity: 1;
    z-index: 1;
  }
}
</style>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
