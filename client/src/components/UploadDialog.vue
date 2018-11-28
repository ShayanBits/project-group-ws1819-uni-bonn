<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="primary" dark>Upload Pictures</v-btn>
            <v-card>
                <v-card-title>
                    <v-flex xs12>
                        <span class="headline">Picture Uploader</span>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <img :src="imageUrl" height="300" v-if="imageUrl"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-btn color="blue darken-1" flat @click='pickFile'>Choose Picture(s)</v-btn>
                                <input
                                        type="file"
                                        style="display: none"
                                        ref="image"
                                        accept="image/*"
                                        @change="onFilePicked"
                                >
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
                dialog: false,
                imageName: '',
                imageUrl: '',
                imageFile: ''
            }
        },
        methods: {
            pickFile () {
                this.$refs.image.click ()
            },

            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            }
        }
    }
</script>