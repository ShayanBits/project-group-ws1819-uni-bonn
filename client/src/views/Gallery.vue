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
        mounted() {
            this.$store.dispatch('fetchImages')
            this.$socket.on('newImages', socket => {
                console.log('fetching new images after socket notification')
                this.$store.dispatch('fetchImages')
            })
        },
        components: {
            GalleryWrapper,
        },
    }
</script>
