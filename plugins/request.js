import apiRespository from '~/api'

export default (ctx, inject) => {
  const { $axios } = ctx

  // 请求拦截器

  // 响应拦截器

  // 错误处理

  // 依赖注入

  inject('api', apiRespository($axios))
}
