<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="primary" dark>Upload Pictures</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Picture Uploader</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-btn color="blue darken-1" flat @click.native="dialog = false">Choose Picture(s)</v-btn>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Picture name*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                              label="Tags"
                                              hint="you can write verious tags divided by a comma in between: sky, city, cars"
                                              required
                                              multiple></v-autocomplete>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                dialog: false
            }
        }
    }
</script>