<template>
  <div>
    <h3>this is about page.</h3>
    <p class="fc-danger">author: {{ author }}</p>
    <p>root state num: {{ num }}</p>
    <p>{{ outsideData }}</p>
    <p>{{ insideData }}</p>
    <button @click="goHome">go home</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'About',
  fetch() {
    console.log('fetch')
  },
  asyncData() {
    console.log('asyncData')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          outsideData: 'outside',
        })
      }, 2000)
    })
  },
  data() {
    console.log('data')
    return {
      insideData: 'inside',
    }
  },
  computed: {
    ...mapState(['num']),
    ...mapState('about', ['author']),
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.SET_ROOT()
    this.SET_AUTHOR('xiaohong')
  },
  methods: {
    ...mapMutations(['SET_ROOT']),
    ...mapMutations('about', ['SET_AUTHOR']),
    goHome() {
      this.$nuxt.$loading.start()
      this.$router.push({ path: '/', query: { id: 1 } })
    },
  },
}
</script>

<style lang="scss" scoped>
.fc-danger {
  color: #aa0f0f;
}
</style>
