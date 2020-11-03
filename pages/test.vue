<template>
  <div>
    <h3>this is test page.</h3>
    <iframe :srcdoc="html" />
  </div>
</template>

<script>
export default {
  name: 'Test',
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
                      },
                      content: 'this is a content.',
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
    this.$toast.success('渲染成功。')
  },
}
</script>
