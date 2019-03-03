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
        mounted() {
            this.$store.dispatch('fetchImages')
            this.$socket.on('newImages', socket => {
                console.log('fetching new images after socket notification')
                this.$store.dispatch('fetchImages')
            })
        },
    }
</script>

<style scoped>

</style>
