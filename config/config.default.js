/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_MIT'

  // add your middleware config here
  config.middleware = []

  // 安全配置
  config.security = {
    csrf: false,
  }

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '',
    },
  }

  // 跨域解决
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  // add your user config here
  const userConfig = {
    myAppName: 'nuxt-starter-template',
  }

  return {
    ...config,
    ...userConfig,
  }
}
