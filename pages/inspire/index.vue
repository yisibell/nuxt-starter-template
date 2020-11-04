<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <div>
        <iframe :srcdoc="html" frameborder="0"></iframe>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Inspire',
  async asyncData({ app }) {
    const { code, data } = await app.$api.email.mjml2html({
      tagName: 'mjml',
      attributes: {},
      children: [
        {
          tagName: 'mj-body',
          attributes: {},
          children: [
            {
              tagName: 'mj-section',
              attributes: {},
              children: [
                {
                  tagName: 'mj-column',
                  attributes: {},
                  children: [
                    {
                      tagName: 'mj-text',
                      attributes: {
                        color: '#ffffff',
                        'font-size': '25px',
                        'text-align': 'center',
                      },
                      content: 'this is a mjml render content.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
    if (code === 200) {
      const { html } = data

      return {
        html,
      }
    }
  },
  mounted() {
    this.$toasted.info('this is a msg.', { duration: 3000 })
  },
}
</script>
