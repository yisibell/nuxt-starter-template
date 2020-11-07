const Controller = require('egg').Controller
const { Nuxt, Builder } = require('nuxt')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const config = require('../../nuxt.config.js')
    const nuxtInstance = new Nuxt(config)

    if (config.dev) {
      const builder = new Builder(nuxtInstance)
      await builder.build()
    }
    ctx.status = 200
    nuxtInstance.render(ctx.request, ctx.response)
  }
}

module.exports = HomeController
