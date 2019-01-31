<template>
  <div>
    <SingleImage v-bind:path="metadata.path" v-bind:label="metadata.label"/>
    <GalleryWrapper type="bottom"/>
  </div>
</template>

<script>
  import SingleImage from "../components/FullscreenImageComponent"
  import GalleryWrapper from '../components/GalleryWrapper'

  export default {
    name: 'gallery',
    components: {
      GalleryWrapper,
      SingleImage,
    },
    computed: {
      metadata() {
        return this.$store.getters.metadata(this.$route.params.id)
      }
    },
  }
</script>