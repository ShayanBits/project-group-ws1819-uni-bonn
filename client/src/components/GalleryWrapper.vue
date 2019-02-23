<template>
    <div class="wrapper">
        <Search v-bind.sync="filters"/>
        <div>{{formatSelectedDateRange()}}</div>
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
    import Search from './Search'
    import {format} from 'date-fns'

    export default {
        name: 'GalleryWrapper',
        components: {Search, GalleryImage},
        props: {
            type: String,
        },
        data() {
            return {
                filters: {
                    terms: [],
                    dateStart: '',
                    dateEnd: '',
                },
            }
        },
        computed: {
            withTitle() {
                return this.type === 'default'
            },
            images() {
                const images = Object.values(this.$store.state.gallery.images)
                return images.filter(image => {
                    return showImage(image, this.filters)
                })
            },
        },
        methods: {
            formatSelectedDateRange() {
                if (this.filters.dateStart !== '' && this.filters.dateEnd !== '') {
                    return 'Selected Date Range: ' + format(new Date(this.filters.dateStart), 'DD/MM/YYYY') + ' - ' + format(new Date(this.filters.dateEnd), 'DD/MM/YYYY')
                }
            }
        }
    }

    function showImage(image, filters) {
        const {terms, dateStart, dateEnd} = filters;

        // filter based on date range picker
        if (dateStart !== '' && dateEnd !== '') {
            if (!image.createdAt) {
                return false
            }
            const imageDateYMD = format(new Date(image.createdAt), 'YYYY-MM-DD')
            if (imageDateYMD <= dateStart || dateEnd <= imageDateYMD) {
                return false
            }
        }

        // filter based on search terms
        for (const term of terms) {
            if (term === image.label) {
                continue
            }
            if (image.tags.includes(term)) {
                continue
            }
            if (term === image.author) {
                continue
            }
            if (term.substr(0, 5) === 'user:') {
                const user = term.substr(5, term.length - 5)
                if (image.user && image.user.name === user) {
                    continue
                }
            }

            if (term.substr(0, 7) === 'before:') {
                const date = new Date(term.substr(7, term.length - 7))
                console.log(date)
                if (image.createdAt) {
                    const imageDate = new Date(image.createdAt)
                    if (imageDate <= date) {
                        continue
                    }
                }
            }

            if (term.substr(0, 6) === 'after:') {
                const date = term.substr(6, term.length - 6)
                if (image.createdAt) {
                    const imageDate = new Date(image.createdAt)
                    if (imageDate >= date) {
                        continue
                    }
                }
            }
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
