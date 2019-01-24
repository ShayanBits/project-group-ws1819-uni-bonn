<template>
    <div v-bind:class="type">
        <div>
            <v-combobox
                    full-width
                    v-model="tags"
                    hide-selected
                    label="Tags"
                    hint="You can assign multiple tags to your image. Press enter after entering one!"
                    multiple
                    :items="loadedTags"
                    small-chips
            />
        </div>
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
        name: 'GalleryWrapper',
        components: {GalleryImage},
        props: {
            type: String,
        },
        data() {
            return {
                tags: [],
            }
        },
        computed: {
            loadedTags() {
                return this.$store.getters.updateTagArray
            },
            withTitle() {
                return this.type === 'default'
            },
            images() {
                const images = Object.values(this.$store.state.gallery.images)
                if (this.tags.length === 0) {
                    return images
                }
                return images.filter(image => {
                    console.log('imageTags', image.tags)
                    return image.tags.some(tag => this.tags.includes(tag))
                })
            },
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
