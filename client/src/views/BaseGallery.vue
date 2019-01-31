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
            // this.$store.dispatch('fetchImages')
        },
    }
</script>

<style scoped>

</style>
