<template>
    <v-dialog id="dialog" v-model="dialog" max-width="800px" style="display: flex; align-items: center">
        <v-btn slot="activator" outline dark color=#2c3e50 @click="debugLog">
            <v-icon>event</v-icon>
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

    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth()+1
    let year = today.getFullYear()

    let startDate = year.toString()+"-"+(month-1).toString()+"-"+day.toString()
    let endDate = year.toString()+"-"+month.toString()+"-"+day.toString()

    let veryFirstDay = '2018-11-01'
    let dateFormat = 'DD/MM/YYYY'

    export default {
        components: {[DateRange.name]: DateRange},
        data() {
            return {
                dateRangeOptions: {
                    startDate: startDate,
                    endDate: endDate,
                    minDate: veryFirstDay,
                    maxDate: endDate,
                    format: dateFormat
                },
                dialog: false,
                pickedStartDate: '',
                pickedEndDate: '',
            }
        },
        props:{


        },
        methods: {
            onDateRangeChange() {
            },
            debugLog(){
                console.log('year: ' + year)
                console.log('month: ' + month)
                console.log('day: ' + day)
                console.log(startDate)
            }
        },
        computed: {
        }
    }
</script>

<style scoped>


</style>
