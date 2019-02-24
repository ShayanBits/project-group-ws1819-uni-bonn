<template>
  <div>
    <div>{{label | titleCase}}</div>
    <div id="container">
      <ImageContainer
        v-bind:label="label"
        v-bind:path="path"
        @img-click="redirectToGallery"
      />
      <div id="left" @click="handleClickLeft"></div>
      <div id="right" @click="handleClickRight"></div>
    </div>
  </div>
</template>

<script>
  import ImageContainer from "./ImageContainer"

  export default {
    name: "ImageContainerFull",
    components: {ImageContainer},
    props: {
      id: Number,
      path: String,
      label: String,
    },
    computed: {
      currentId() {
        return this.$route.params.id
      },
    },
    methods: {
      redirectToGallery(id = '') {
        this.$router.push('/gallery/' + id)
      },
      handleClickRight() {
        const newId = this.$store.getters.adjacentId(this.currentId, 1)
        this.redirectToGallery(newId)
      },
      handleClickLeft() {
        const newId = this.$store.getters.adjacentId(this.currentId, -1)
        this.redirectToGallery(newId)
      }
    }
  }
</script>

<style scoped>
  #container {
    position: relative;
    display: inline-block;
  }

  #container > img {
    display: block;
  }

  #left,
  #right {
    position: absolute;
    top: 0;
    width: 33%;
    height: 100%;
    transition: 0.6s ease;
  }

  #left:hover,
  #right:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  #right {
    right: 0;
  }
</style>