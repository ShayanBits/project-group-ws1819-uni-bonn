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

    const conditions = [
        (term, image) => image.label === term,
        (term, image) => image.tags.includes(term),
        (term, image) => image.user && image.user.name === getActualTerm(term, 'user'),
        (term, image) => image.createdAt && image.createdAt <= new Date(getActualTerm(term, 'before')),
        (term, image) => image.createdAt && image.createdAt >= new Date(getActualTerm(term, 'after')),
    ]

    function getActualTerm(term, prefix) {
        const prefixLength = prefix.length + 1
        if (term.substr(0, prefixLength === prefix + ':')) {
            return term.substr(prefixLength, term.length - prefixLength)
        }
        return null
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
        loopTerms: for (const fullTerm of terms) {
            const negated = fullTerm.substr(0, 1) === '-'
            const term = negated ? fullTerm.substr(1) : fullTerm
            for (const condition of conditions) {
                const passed = condition(term, image)
                if (passed && negated) {
                    return false
                }
                if (passed) {
                    continue loopTerms;
                }
            }
            if (negated) {
                continue
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
