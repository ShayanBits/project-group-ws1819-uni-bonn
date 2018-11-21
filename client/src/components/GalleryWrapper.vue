<template>
  <div v-bind:class="type">
    <GalleryImage
      v-for="image in images"
      v-bind:id="image._id"
      v-bind:key="image._id"
      v-bind:withTitle="withTitle"
    />
  </div>
</template>

<script>
  import GalleryImage from './GalleryImage'
  export default {
    name: "GalleryWrapper",
    components: {GalleryImage},
    props: {
      type: String,
    },
    computed: {
      withTitle() {
        return this.type === 'default'
      },
      images() {
        return Object.values(this.$store.state.gallery.images)
      }
    },
  }
</script>

<style scoped>
  .default {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .default > div {
    margin: 5px;
  }

  .bottom {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 10px;
  }

  .bottom > div {
    flex-basis: 25%;
  }

  @media screen and (min-width: 834px) {
    .default > div {
      flex-basis: 48%;
    }
    .bottom {
      flex-flow: row nowrap;
    }
  }

  @media screen and (min-width: 1666px) {
    .default > div {
      flex-basis: 32%;
    }
  }
</style>