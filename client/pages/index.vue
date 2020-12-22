<template>
  <div class="questionnaire-home">
    <div class="text-center">
      <base-logo :src="questionnaire_info.logo" />
    </div>
    <v-card class="mb-4">
      <v-card-title class="questionnaire-home__title">
        {{
          (questionnaire_info.front_cover_text &&
            questionnaire_info.front_cover_text.content) ||
          `You are invited to participate in our user surveys to improve the quality of our website services.`
        }}
      </v-card-title>
      <v-card-text>
        <div class="questionnaire-home__return">
          <span>In return, we will provide you with</span>
          <span class="questionnaire-home__return__type">coupons</span>
          <span> after completion.</span>
        </div>

        <div class="questionnaire-home__tips">
          <span
            >The questionnaire has 10 questions and it is expected to take 5
            minutes</span
          >
        </div>
      </v-card-text>
    </v-card>

    <div class="d-flex justify-center questionnaire-home__actions">
      <v-btn
        class="questionnaire-home__start-btn"
        color="primary"
        @click="handleStart"
      >
        START
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BaseLogo from '~/components/BaseLogo'

export default {
  layout: 'questionnaire',
  components: {
    BaseLogo,
  },
  validate({ query }) {
    const { token } = query

    return !!token
  },
  async fetch({ store, query, error }) {
    await store.dispatch('questionnaire/fetchQuestionnaire', query)
  },
  computed: {
    ...mapGetters('questionnaire', ['isStoped', 'isSubmitted']),
    ...mapState('questionnaire', ['questionnaire_info', 'token']),
  },
  mounted() {
    this.validate()
  },
  methods: {
    // 开始答题
    handleStart() {
      if (this.validate()) {
        this.$router.push({ path: '/servey', query: this.$route.query })
      }
    },
    // 验证
    validate() {
      if (this.isSubmitted) {
        this.$toast.global.warning('This investigation has been submitted!')
        this.$router.push({
          path: '/servey/award',
          query: this.$route.query,
        })
        return false
      }

      if (this.isStoped) {
        this.$toast.global.warning('This investigation is over!')
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/modules/variables.scss';

.questionnaire-home {
  &__title {
    font-size: 1.5rem !important;
    font-weight: 400;
    line-height: 1.2em;
    letter-spacing: normal;
    font-family: 'Roboto', sans-serif !important;
    font-style: italic;
  }

  &__return {
    text-align: center;
    border: 1px solid #979797;
    padding: 60px;
    margin-bottom: 50px;
    font-size: 1rem;
    color: #000000;
    border-radius: 4px;

    &__type {
      color: $--color-primary;
    }
  }

  &__tips {
    text-align: center;
  }

  &__actions {
    position: sticky;
    bottom: 2px;
    z-index: 1024;
  }

  &__start-btn {
    flex: 0.2;
  }
}

@media screen and (max-width: 600px) {
  .questionnaire-home {
    &__return {
      padding: 20px;
    }

    &__start-btn {
      flex: 1;
    }
  }
}
</style>
