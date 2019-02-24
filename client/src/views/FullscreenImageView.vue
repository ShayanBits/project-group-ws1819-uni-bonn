<template>
  <div>
    <ImageContainerFull v-bind:path="metadata.path" v-bind:label="metadata.label"/>
    <GalleryWrapper type="bottom"/>
  </div>
</template>

<script>
  import ImageContainerFull from "../components/ImageContainerFull"
  import GalleryWrapper from '../components/GalleryWrapper'

  export default {
    name: 'gallery',
    components: {
      GalleryWrapper,
      ImageContainerFull,
    },
    computed: {
      metadata() {
        return this.$store.getters.metadata(this.$route.params.id)
      }
    },
  }
</script>