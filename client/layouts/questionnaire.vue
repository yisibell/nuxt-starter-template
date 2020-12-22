<template>
  <v-app class="questionnaire-app">
    <v-app-bar app light :color="themes.primary" :min-height="appBarHeight">
      <div class="questionnaire-app__bar">
        <div class="questionnaire-app__bar__title">QUESTIONNAIRE</div>
        <div v-if="showProgress" class="questionnaire-app__bar__progress">
          <v-progress-linear
            v-model="progress"
            color="#ffffff"
            rounded
          ></v-progress-linear>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col :lg="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('questionnaire', ['questionnaire_info', 'is_servey_Page']),
    ...mapGetters('questionnaire', ['progress']),
    themes() {
      return this.$vuetify.theme.themes.light
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
    appBarHeight() {
      return this.isMobile ? 56 : 75
    },
    showProgress() {
      return this.questionnaire_info.show_progress_bar && this.is_servey_Page
    },
  },
}
</script>

<style lang="scss" scoped>
.questionnaire-app {
  &__bar {
    width: 100%;
    box-sizing: border-box;
    &__title {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #fff;
      font-size: 32px;
    }

    &__progress {
      width: 100%;
      padding-top: 6px;
    }
  }
}

@media screen and (max-width: 600px) {
  .questionnaire-app__bar__title {
    font-size: 18px;
  }
}
</style>
