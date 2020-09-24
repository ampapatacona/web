import { auth } from '@/plugins/firebase'
import gql from 'graphql-tag'

export const state = () => ({
  user: null,
  token: null
})

export const actions = {
  AUTH_CHECK({ commit, dispatch }) {
    auth.onAuthStateChanged((firebaseUser) => {
      return firebaseUser
        .getIdToken()
        .then((token) =>
          auth.currentUser.getIdTokenResult().then((result) => {
            if (result.claims['https://hasura.io/jwt/claims']) {
              return token
            }
            const endpoint = process.env.SERVER_URL
            return fetch(
              `${endpoint}/refreshtoken?uid=${firebaseUser.uid}`
            ).then((res) => {
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
          console.log('valid token', validToken)
          commit('SET_TOKEN', validToken)
          // Store Token / Or create Apollo with your new token!
        })
        .catch(console.error)
    })
  },

  GET_USER_DATA({ commit }) {
    const user = state.user

    if (user) {
      this.app.apolloProvider.defaultClient
        .query({
          query: gql`
            query SEARCHUSER($id: String!) {
              members(where: { id: { _eq: $id } }) {
                email
                created_at
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
            id: 'aa'
          }
        })
        .then(({ data }) => {
          if (data && data.id === user.uid) {
            // User exists
            console.log('data from endpoint', data)
            const userData = { ...user, data }
            commit('SET_USER', userData)
          } else {
            // user doesn't exist
          }
        })
    }
  },

  LOGOUT({ commit }) {
    auth.signOut()
    commit('SET_USER', null)
    return this.$router.replace(`/`)
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
