<template>
  <div class="servey-award">
    <div class="servey-award__body">
      <div class="servey-award__tips">
        <div class="servey-award__tips__icon">
          <v-img
            :width="infoIconSize.width"
            :height="infoIconSize.height"
            src="/images/info.png"
            contain
          />
        </div>
        <div class="servey-award__tips__content">
          {{
            (questionnaire_info.back_cover_text &&
              questionnaire_info.back_cover_text.content) ||
            'Thank you for completing this survey.'
          }}
        </div>
      </div>
      <div class="servey-award__coupon">
        <coupon-card :value="questionnaire_info.coupon_code" />
      </div>
    </div>

    <div class="servey-award__footer">
      <v-btn color="primary" large tile block @click="toShopping">
        SHOPPING NOW
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CouponCard from '~/components/CouponCard'
export default {
  layout: 'questionnaire',
  components: {
    CouponCard,
  },
  async fetch({ store, query, redirect }) {
    const { token } = query
    if (!token) {
      redirect('/')
      return
    }

    await store.dispatch('questionnaire/fetchQuestionnaire', query)
  },
  computed: {
    ...mapState('questionnaire', ['questionnaire_info']),
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
    infoIconSize() {
      if (this.isMobile) {
        return {
          width: 100,
          height: 75,
        }
      }

      return {
        width: 231,
        height: 158,
      }
    },
  },
  methods: {
    toShopping() {
      const { shopping_url } = this.questionnaire_info
      window.open(shopping_url)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/modules/variables.scss';

.servey-award {
  &__tips {
    text-align: center;
    color: $--color-primary;
    margin-bottom: 20px;

    &__icon {
      text-align: center;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }

    &__content {
      font-weight: 500;
    }
  }

  &__body {
    min-height: 80vh;
  }

  &__footer {
    position: sticky;
    bottom: 2px;
  }
}
</style>
