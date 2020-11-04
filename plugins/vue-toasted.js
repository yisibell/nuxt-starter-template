import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  duration: 5000,
  position: 'top-center',
  keepOnHover: true,
  fitToScreen: false,
  fullWidth: false,
  iconPack: 'material',
})

const registers = [
  {
    name: 'success',
    message: (payload) => {
      const { message } = payload

      return message || 'success...'
    },
    options: { type: 'success', icon: 'check' },
  },
]

registers.forEach((v) => {
  Vue.toasted.register(v.name, v.message, v.options)
})

export default (ctx, inject) => {
  inject('toast', Vue.toasted)
}
