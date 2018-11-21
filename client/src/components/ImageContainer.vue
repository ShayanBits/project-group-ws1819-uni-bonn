<template>
  <img
    v-bind:src="fullPath"
    v-bind:alt="label"
    @click="onClick"
  />
</template>

<script>
  export default {
    name: "ImageContainer",
    props: {
      path: String,
      label: String,
    },
    methods: {
      onClick() {
        this.$emit('img-click')
      },
    },
    computed: {
      fullPath() {
        return '/img/' + this.path + '.jpg'
      },
    }
  }
</script>

<style scoped>
  img {
    max-width: 100%;
  }
</style>