<template>
    <v-dialog v-model="dialog" max-width="800px">
        <v-btn slot="activator" fab dark color="indigo">
            <v-icon medium dark>fa-calender</v-icon>
        </v-btn>
        <v-card>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                    <v-daterange :options="dateRangeOptions" @input="onDateRangeChange"></v-daterange>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<script>
    // If you want to use in one of your components.
    import {DateRange} from 'vuetify-daterange-picker';
    import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

    export default {
        components: {[DateRange.name]: DateRange},
        data() {
            return {
                dateRangeOptions: {
                    startDate: '2019-01-01',
                    endDate: '2020-01-01',
                    minDate: '2019-01-01',
                    maxDate: '',
                    format: 'DD/MM/YYYY'
                },
                dialog: false,
                pickedStartDate: '',
                pickedEndDate: '',
            }
        },
        methods: {
            onDateRangeChange() {
            }
        },
        computed: {}
    }
</script>

<style scoped>

</style>
