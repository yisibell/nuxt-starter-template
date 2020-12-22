<template>
  <div class="servey">
    <div class="servey__content">
      <!-- 题目内容 -->
      <answer-section
        v-model="answer"
        :unfinished-tips="unfinishedTips"
        :question-list="question_list"
        :current="current"
      />
    </div>
    <div class="servey__footer">
      <div
        v-if="questionnaire_info.show_question_number"
        class="servey__footer__count"
      >
        <span class="servey__footer__count__current">{{
          question_current
        }}</span>
        <span>/</span>
        <span>{{ question_total }}</span>
      </div>
      <div class="servey__footer__operate">
        <v-btn
          v-if="current !== 0"
          class="servey__footer__operate__previous-btn"
          color="#ffffff"
          large
          tile
          @click="handlePrev"
        >
          PREVIOUS
        </v-btn>
        <v-btn
          class="servey__footer__operate__next-btn"
          color="primary"
          large
          tile
          :loading="loading"
          @click="handleNext"
        >
          NEXT
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import AnswerSection from '~/components/AnswerSection'
export default {
  name: 'Servey',
  layout: 'questionnaire',
  components: {
    AnswerSection,
  },
  async fetch({ store, query, redirect }) {
    const { token } = query

    if (!token) {
      redirect('/')
      return
    }

    await store.dispatch('questionnaire/fetchQuestionnaire', token)
  },
  data() {
    return {
      answer: [],
      unfinishedTips: '',
      loading: false,
    }
  },
  computed: {
    ...mapState('questionnaire', ['token', 'current', 'questionnaire_info']),
    ...mapGetters('questionnaire', [
      'question_current',
      'question_total',
      'isStoped',
      'question_list',
    ]),
    // 当前题答案
    currAnswer() {
      return this.answer[this.current]
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations('questionnaire', [
      'SET_CURRENT',
      'SET_SUBMIT_STATUS',
      'SET_IS_SERVEY_PAGE',
    ]),
    // 问题未完成提示
    handleUnfinishedTips() {
      const { value } = this.currAnswer

      this.unfinishedTips = ''

      if (
        value === '' ||
        JSON.stringify(value) === '[]' ||
        JSON.stringify(value) === '{}'
      ) {
        this.unfinishedTips =
          'Please complete the current question before clicking the next.'
      }

      return this.unfinishedTips
    },
    // 上一题
    handlePrev() {
      if (this.current !== 0) {
        this.SET_CURRENT(this.current - 1)
      }
    },
    // 下一题
    handleNext() {
      if (this.handleUnfinishedTips()) return

      if (this.question_current === this.question_total) {
        // 提交答案
        this.submit()
      } else {
        this.SET_CURRENT(this.current + 1)
      }
    },
    async submit() {
      try {
        this.loading = true
        const post_data = {
          token: this.token,
          answer: this.answer,
        }

        const { code } = await this.$api.questionnaire.submitQuestionnaire(
          post_data
        )

        if (code === 200) {
          this.$router.push({
            path: '/servey/award',
            query: this.$route.query,
          })
          this.SET_SUBMIT_STATUS(true)
          this.SET_IS_SERVEY_PAGE(false)
        }
      } finally {
        this.loading = false
      }
    },
    init() {
      if (this.isStoped) {
        this.$router.replace('/')
        return
      }

      this.SET_IS_SERVEY_PAGE(true)
      this.SET_CURRENT(0)

      this.answer = this.question_list.reduce((res, v) => {
        const { id, name } = v
        const temp = {
          id,
          name,
          value: '',
        }

        switch (name) {
          case 'radio':
            temp.value = ''
            break
          case 'checkbox':
            temp.value = []
            break
          case 'rate':
            temp.value = {}
            break
          case 'short-answer':
            temp.value = ''
        }

        res.push(temp)

        return res
      }, [])
    },
  },
}
</script>

<style lang="scss" scoped>
.servey {
  &__content {
    min-height: 82vh;
  }

  &__footer {
    position: sticky;
    bottom: 2px;
    z-index: 1024;

    &__count {
      font-weight: 500;
      text-align: center;
      margin-bottom: 10px;

      &__current {
        font-size: 24px;
      }
    }

    &__operate {
      display: flex;
      justify-content: space-between;

      &__previous-btn {
        flex: 1;
      }

      &__next-btn {
        flex: 1;
      }
    }
  }
}
</style>
