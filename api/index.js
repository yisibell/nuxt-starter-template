import user from './modules/user'
import email from './modules/email'

export default (axios) => ({
  user: user(axios),
  email: email(axios),
})
