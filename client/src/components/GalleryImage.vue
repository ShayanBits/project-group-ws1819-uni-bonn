<template>
  <div>
    <ImageContainer
      v-bind:path="metadata.path"
      v-bind:label="metadata.label"
      @img-click="singleImage"
    />
    <!--TODO: add break line so that title goes on the next line-->
    <!--<span v-if="withTitle">{{metadata.label | titleCase}}</span>-->
  </div>
</template>

<script>
  import ImageContainer from "./ImageContainer"

  export default {
    name: "GalleryImage",
    components: {ImageContainer},
    props: {
      id: String,
      withTitle: Boolean,
    },
    computed: {
      metadata() {
        const metadata = this.$store.getters.metadata(this.id)
        return metadata;
      },
    },
    methods: {
      singleImage() {
        this.$router.push('/gallery/' + this.id)
      }
    }
  }
</script>

<style scoped>

</style>
