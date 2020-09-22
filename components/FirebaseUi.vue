<template>
  <div id="firebaseui-auth-container" />
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
          privacyPolicyUrl: '/privacy-policy/',
          callbacks: {
            signInSuccessWithAuthResult() {
              // console.log('signInSuccessWithAuthResult')
              vm.$store.dispatch('AUTH_CHECK')
              vm.$router.replace(`/${locale}/app/`)
            },
            uiShown() {
              // console.log('uiShown')
            }
          }
        }

        ui.start('#firebaseui-auth-container', config)
      })
    }
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
