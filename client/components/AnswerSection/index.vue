<template>
  <div>
    <client-only v-for="(v, i) in questionList" :key="i">
      <ai-block-tips v-if="i === current" :message="unfinishedTips">
        <ai-choice
          v-if="v.name === 'radio'"
          v-model="answer[i].value"
          :index="i + 1"
          :title-content="v.value.title.content"
          :options="v.value.options"
          @input="handleInput"
        />
        <ai-choice
          v-else-if="v.name === 'checkbox'"
          v-model="answer[i].value"
          :index="i + 1"
          multiple
          :title-content="v.value.title.content"
          :options="v.value.options"
          :max="v.value.max_option"
          @input="handleInput"
        />
        <ai-rate-group
          v-else-if="v.name === 'rate'"
          v-model="answer[i].value"
          :index="i + 1"
          :title-content="v.value.title.content"
          :options="v.value.options"
          :max="v.value.scale_type"
          @input="handleInput"
        />
        <ai-short-answer
          v-else-if="v.name === 'short-answer'"
          v-model="answer[i].value"
          :index="i + 1"
          :title-content="v.value.title.content"
          :maxlength="v.value.max_character"
          @input="handleInput"
        />
      </ai-block-tips>
    </client-only>
  </div>
</template>

<script>
import { isEqual, cloneDeep } from 'lodash'
export default {
  name: 'AnswerSection',
  props: {
    // 绑定值
    value: {
      type: Array,
      default: () => [],
    },
    // 为完成提示
    unfinishedTips: {
      type: String,
      default: '',
    },
    // 问题列表
    questionList: {
      type: Array,
      default: () => [],
    },
    // 当前问题索引
    current: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      answer: [],
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!isEqual(val, this.answer)) {
          this.answer = cloneDeep(val)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.answer)
    },
  },
}
</script>
