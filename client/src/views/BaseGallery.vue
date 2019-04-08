<template>
    <div>
        <uploadOverlay v-if="user"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import uploadOverlay from '../components/UploadDialog'

    export default {
        components: {uploadOverlay},
        name: "BaseGallery",
        computed: {
            user() {
                return this.$store.getters.user
            },
        },
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
