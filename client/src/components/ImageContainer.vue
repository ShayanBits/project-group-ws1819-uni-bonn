<template>
  <figure>
  <img
    v-bind:src="fullPath"
    v-bind:alt="label"
    @click="onClick"
  />
    <figcaption>
      {{label}}
    </figcaption>
  </figure>
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
        return '/img/' + this.path
      },
    }
  }
</script>

<style scoped>
  img {
    max-width: 100%;
    max-height: 500px;
   }
  figure{
    border-color: #42b983;
    border-style: solid;
    border-width: 3px;
    background-color: #2c3e50;
  }
  figcaption{
    color: #42b983;
    font-weight: bold;
  }
</style>
