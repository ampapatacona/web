import { auth } from '@/plugins/firebase'
import gql from 'graphql-tag'

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
            commit('SET_TOKEN', validToken)
            // Store Token / Or create Apollo with your new token!
            return validToken
          })
          .then(() => dispatch('GET_USER_DATA', firebaseUser.uid))
          .catch((err) => console.error(err))
      }
    })
  },

  GET_USER_DATA({ commit }, uid) {
    this.app.apolloProvider.defaultClient
      .query({
        query: gql`
          query($id: String!) {
            members_by_pk(id: $id) {
              created_at
              email
              family_id
              firstname
              id
              isadmin
              lastname
              updated_at
            }
          }
        `,
        variables: {
          id: uid
        }
      })
      .then(({ data }) => {
        if (data.members_by_pk) {
          // User exists
          // console.log('data from endpoint', data)
          const userData = { ...data.members_by_pk }
          commit('SET_USER', userData)
          return this.$router
            .replace(`/${this.$i18n.locale}/app/`)
            .catch((error) => {
              console.error(error.message)
            })
        } else {
          // user doesn't exist
          console.log('user does not exist on the database yet')
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
