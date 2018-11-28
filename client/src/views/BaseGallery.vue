<template>
    <div>
        <uploadOverlay/>
        <router-view></router-view>
    </div>
</template>

<script>
    import postJson from '../mixins/postJson'
    import uploadOverlay from '../components/UploadDialog'

    export default {
        components: {uploadOverlay},
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