<template>
  <div>
    <h1>Gallery</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  import postJson from '../mixins/postJson'

  export default {
    name: "BaseGallery",
    beforeCreate() {
      postJson('/getImageJson', {}).then(json => {
        this.$store.commit('receiveImages', {images: this.reduceToObject(json.images)})
      })
    },
    methods: {
      reduceToObject(array) {
        return array.reduce(function (map, obj) {
          map[obj._id] = obj
          return map;
        }, {})
      }
    }
  }
</script>

<style scoped>

</style>