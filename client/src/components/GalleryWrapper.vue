<template>
    <div class="wrapper">
        <div class="filter">
            <v-combobox
                style="color: #2c3e50"
                class="search-input"
                v-model="searchTerms"
                hide-selected
                label="Search"
                hint="Press enter to add a search term"
                multiple
                :items="loadedTags"
                small-chips
            />
            <DatePicker></DatePicker>
        </div>
        <div v-bind:class="type">
            <GalleryImage
                v-for="image in images"
                v-bind:id="image._id"
                v-bind:key="image._id"
                v-bind:withTitle="withTitle"
            />
        </div>
    </div>
</template>

<script>
    import GalleryImage from './GalleryImage'
    import DatePicker from './DatePicker'

    export default {
        name: 'GalleryWrapper',
        components: {DatePicker, GalleryImage},
        props: {
            type: String,
        },
        data() {
            return {
                searchTerms: [],
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
                if (this.searchTerms.length === 0) {
                    return images
                }
                return images.filter(image => {
                    return showImage(image, this.searchTerms)
                })
            },
        },
    }

    function showImage(image, searchTerms) {
        for (const term of searchTerms) {
            if (term === image.label) {
                continue
            }
            if (image.tags.includes(term)) {
                continue
            }
            if (term === image.author) {
                continue
            }
            // if (['>', '<'].includes.term.substr(0, 1)) {
            // const uploadTime = moment(image.uploadTime);
            // const imageDate = uploadTime.format('YYYY-MM-DD');
            // const date = term.substr(1, term.length - 1)
            // }
            return false
        }
        return true
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .search-input {
        flex-basis: 70%;
    }

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

    .filter {
        width: 70%;
        display: flex;
        flex-direction: row;
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
