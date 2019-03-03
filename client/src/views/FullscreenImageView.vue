<template>
  <div>
    <ImageContainerFull v-bind:id="id"/>
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
      id() {
        return this.$route.params.id
      }
    }
  }
</script>