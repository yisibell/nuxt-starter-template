import { cloneDeep } from 'lodash'

export const state = () => ({
  token: '',
  is_servey_Page: false,
  current: 0, // 当前题索引
  already_submitted: false, // 是否已提交过
  questionnaire_info: {
    // 问卷信息
    question: [], // 问题列表
    show_progress_bar: 0, // 是否显示答题进度条
    show_question_number: 0, // 是否显示答题编号
    logo: '', // 封面 logo
    coupon_code: '', // 优惠卷
    back_cover_text: {
      // 完成页文本
      content: '',
    },
    front_cover_text: {
      // 封面文本
      content: '',
    },
    // 购物跳转链接
    shopping_url: '',
  },
})

export const getters = {
  question_list(state) {
    return state.questionnaire_info.question || []
  },
  // 总题数
  question_total(state, getters) {
    return getters.question_list.length
  },
  // 当前题号
  question_current(state) {
    return state.current + 1
  },
  // 答题进度
  progress(state, getters) {
    const { question_total, question_current } = getters
    if (!question_total) return 0
    return (question_current / question_total) * 100
  },
  // 该问卷是否已停止收集
  isStoped(state) {
    return state.questionnaire_info.status !== 2
  },
  // 该问卷是否已提交过
  isSubmitted(state) {
    return state.already_submitted
  },
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_CURRENT(state, index) {
    state.current = index || 0
  },
  SET_QUESTIONNAIRE_INFO(state, info) {
    state.questionnaire_info = cloneDeep(info || {})
  },
  SET_SUBMIT_STATUS(state, status) {
    state.already_submitted = status
  },
  SET_IS_SERVEY_PAGE(state, status) {
    state.is_servey_Page = status
  },
}

export const actions = {
  async fetchQuestionnaire({ commit }, { token, preview = 0 } = {}) {
    let res = {}
    const {
      getQuestionnaire,
      getQuestionnairePreview,
    } = this.$api.questionnaire

    if (preview) {
      res = await getQuestionnairePreview({ token })
    } else {
      res = await getQuestionnaire({ token })
    }

    const { code, data } = res

    if (code === 200) {
      const { already_submitted, questionnaire } = data
      commit('SET_SUBMIT_STATUS', already_submitted)
      commit('SET_QUESTIONNAIRE_INFO', questionnaire)
      commit('SET_IS_SERVEY_PAGE', false)
      commit('SET_CURRENT', 0)
      commit('SET_TOKEN', token)
    }
  },
}
