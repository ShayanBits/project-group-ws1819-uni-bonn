<template>
  <div class="gallery">
    <GalleryWrapper type="default"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GalleryWrapper from '@/components/GalleryWrapper.vue'

export default {
  name: 'gallery',
  components: {
    GalleryWrapper
  }
}
</script>
