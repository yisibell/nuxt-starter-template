import user from './modules/user'

export default (axios) => ({
  user: user(axios),
})
