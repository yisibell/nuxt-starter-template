export const state = () => ({
  num: 0,
  token: 'this is a test token value',
})

export const getters = {
  token(state) {
    return state.token
  },
}

export const mutations = {
  SET_ROOT(state, n) {
    state.num++
  },
}
