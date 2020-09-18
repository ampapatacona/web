<template>
  <div id="firebaseui-auth-container" />
</template>

<script>
import { auth, authProviders } from '~/plugins/firebase'

export default {
  name: 'Login',
  mounted() {
    if (process.browser) {
      let firebaseUILoader
      const vm = this
      const locale = this.$i18n.locale
      const localeUrl = locale === 'ca' ? '/' : '/es'
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
          signInOptions: [authProviders.email, authProviders.Google],
          signInSuccessUrl: '/area-socis/',
          tosUrl: '/tos/',
          privacyPolicyUrl: '/privacy-policy/',
          callbacks: {
            signInSuccessWithAuthResult() {
              // console.log('signInSuccessWithAuthResult')
              vm.$router.replace(`${localeUrl}/area-socis`)
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
