export default (request) => ({
  // 获取问卷信息
  getQuestionnaire(params) {
    return request({
      url: `/user_questionnaire`,
      method: 'get',
      params,
    })
  },
  // 提交问卷
  submitQuestionnaire(data) {
    return request({
      url: `/user_questionnaire`,
      method: 'post',
      data,
    })
  },
  // 问卷预览数据
  getQuestionnairePreview(params) {
    return request({
      url: `/questionnaire/preview`,
      method: 'get',
      params,
    })
  },
})
