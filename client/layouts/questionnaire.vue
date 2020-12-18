<template>
  <v-app class="questionnaire-app">
    <v-app-bar app light :color="themes.primary" class="questionnaire-app__bar">
      <div class="questionnaire-app__bar__title">QUESTIONNAIRE</div>
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
export default {
  computed: {
    themes() {
      return this.$vuetify.theme.themes.light
    },
  },
  mounted() {
    console.log(this.$vuetify)
  },
}
</script>

<style lang="scss" scoped>
.questionnaire-app {
  &__bar {
    display: flex;
    justify-content: center;

    &__title {
      color: #fff;
      font-size: 32px;
    }

    @media screen and (max-width: 600px) {
      .questionnaire-app__bar__title {
        font-size: 18px;
      }
    }
  }
}
</style>
