export const state = () => ({
  token: '',
})

export const getters = {
  token(state) {
    return state.token
  },
}

export const mutations = {
  SET_TOKEN(state, ticket) {
    state.token = ticket
  },
}
