import { auth } from '@/plugins/firebase'

export const state = () => ({
  user: null
})

export const actions = {
  AUTH_CHECK({ commit }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const {
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          refreshToken
        } = user

        const userObj = {
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          refreshToken
        }

        commit('SET_USER', userObj)
      }
    })
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
  }
}
