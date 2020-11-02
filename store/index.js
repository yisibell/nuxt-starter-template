export const state = () => ({
  num: 0,
})

export const mutations = {
  SET_ROOT(state, n) {
    state.num++
  },
}
