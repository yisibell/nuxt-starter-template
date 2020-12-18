<template>
  <div>
    <ai-choice
      v-model="answer"
      :index="1"
      :title-content="titleContent"
      :options="options"
    />
  </div>
</template>

<script>
export default {
  name: 'Servey',
  layout: 'questionnaire',
  data() {
    return {
      answer: '',
      titleContent: 'what is your favorate love ?',
      options: [
        { label: 'this is a question label', value: 1 },
        { label: 'this is a question label', value: 2 },
        { label: 'this is a question label', value: 3 },
        { label: 'this is a question label', value: 4 },
        { label: 'this is a question label', value: 5 },
      ],
    }
  },
}
</script>
