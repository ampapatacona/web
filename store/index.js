import { auth } from '@/plugins/firebase'

export const state = () => ({
  user: null,
  token: null
})

export const actions = {
  AUTH_CHECK({ commit, dispatch }) {
    const vm = this
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        return firebaseUser
          .getIdToken()
          .then((token) =>
            auth.currentUser.getIdTokenResult().then((result) => {
              if (result.claims['https://hasura.io/jwt/claims']) {
                // console.log(result.claims)
                return token
              }
              const { uid, email } = firebaseUser
              return vm.$axios
                .post('/refresh-token', { uid, email })
                .then((res) => {
                  if (res.status === 200) {
                    return firebaseUser.getIdToken(true)
                  }
                  return res.json().then((e) => {
                    throw e
                  })
                })
            })
          )
          .then((validToken) => {
            // console.log('valid token', validToken)
            const { uid, email, emailVerified } = firebaseUser
            const user = { uid, email, emailVerified }
            commit('SET_TOKEN', validToken)
            commit('SET_USER', user)
            // Store Token / Or create Apollo with your new token!
            return this.$router.replace(`/${this.$i18n.locale}/app/`)
          })
          .catch((err) => console.error(err))
      }
    })
  },

  LOGOUT({ commit }) {
    auth.signOut()
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    // console.log(this.$router.currentRoute.fullPath)
    const home = `/${this.$i18n.locale}/`
    if (this.$router.currentRoute.fullPath !== home) {
      return this.$router.replace(`/${this.$i18n.locale}/`)
    }
    return true
  }
}

export const mutations = {
  SET_USER(state, data) {
    state.user = data
  },
  SET_TOKEN(state, data) {
    state.token = data
  }
}
