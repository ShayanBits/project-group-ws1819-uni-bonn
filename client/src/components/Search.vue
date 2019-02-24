<template>
    <div class="filter">
        <v-combobox
            class="search-input"
            v-on:change="updateSearchTerms"
            hide-selected
            label="Search"
            hint="Press enter to add a search term"
            multiple
            :items="availableTags"
            small-chips
        />
        <DatePicker v-on:dateRange="updateDateRange"></DatePicker>
    </div>
</template>
<script>
    import DatePicker from './DatePicker'

    export default {
        name: 'Search',
        components: {DatePicker},
        props: {
            search: Object,
        },
        beforeMount() {
            this.$store.dispatch('fetchTags')
        },
        computed: {
            availableTags() {
                return this.$store.getters.tags
            },
        },
        methods: {
            updateSearchTerms(terms) {
                this.$emit('update:terms', terms)
            },
            updateDateRange(dateRange) {
                this.$emit('update:dateStart', dateRange[0])
                this.$emit('update:dateEnd', dateRange[1])
            }
        }
    }
</script>
<style scoped>
    .search-input {
        flex-basis: 70%;
        color: #2c3e50;
    }

    .default > div {
        margin: 5px;
    }

    .bottom > div {
        flex-basis: 25%;
    }


    @media screen and (min-width: 834px) {
        .default > div {
            flex-basis: 48%;
        }
    }

    @media screen and (min-width: 1666px) {
        .default > div {
            flex-basis: 32%;
        }
    }
</style>