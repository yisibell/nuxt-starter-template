export const state = () => ({
  author: 'elenh',
  age: 18,
  email: 'test@163.com',
})

export const mutations = {
  SET_AUTHOR(state, name) {
    state.author = name
  },
}
