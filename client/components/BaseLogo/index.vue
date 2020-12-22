<template>
  <img class="base-logo" alt="Base Logo" :src="src" />
</template>

<script>
export default {
  name: 'BaseLogo',
  props: {
    src: {
      type: String,
      default: '/vuetify-logo.svg',
    },
  },
}
</script>

<style>
.base-logo {
  height: 180px;
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
