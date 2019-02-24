<template>
    <v-dialog id="dialog" v-model="dialog" max-width="800px" style="display: flex; align-items: center">
        <v-btn slot="activator" outline dark color=#2c3e50>
            <v-icon>event</v-icon>
        </v-btn>
        <v-card>
            <v-card-text>
                <v-daterange :options="dateRangeOptions" @input="onDateRangeChange"></v-daterange>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialog = false">Cancel</v-btn>
                <v-btn @click="onClickApply">Apply</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
    // If you want to use in one of your components.
    import {DateRange} from 'vuetify-daterange-picker'
    import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'
    import {startOfISOWeek, endOfISOWeek, format} from 'date-fns'

    const dateFormat = 'YYYY-MM-DD'
    const dateFormatHuman = 'DD/MM/YYYY'

    const minDate = '2018-11-01'
    const today = new Date();

    const startDate = minDate;
    const endDate = format(today, dateFormat)

    const presets = [{
        label: 'Everything',
        range: [startDate, endDate],
    }, {
        label: 'This week',
        range: [
            format(startOfISOWeek(today), dateFormat),
            format(endOfISOWeek(today), dateFormat),
        ],
    }]

    export default {
        components: {[DateRange.name]: DateRange},
        data() {
            return {
                dateRangeOptions: {startDate, endDate, minDate, format: dateFormatHuman, presets},
                selectedDateRange: [startDate, endDate],
                dialog: false,
            }
        },
        methods: {
            onDateRangeChange(dates) {
                this.selectedDateRange = dates;
            },
            onClickApply() {
                this.$emit('dateRange', this.selectedDateRange)
                this.dialog = false
            },
        },
        computed: {},
    }
</script>

<style scoped>


</style>
