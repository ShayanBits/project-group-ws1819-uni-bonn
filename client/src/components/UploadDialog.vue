<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" fab dark color="indigo">
                <v-icon dark @click='callFetchTags'>add</v-icon>
            </v-btn>
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
                                <!--
                                TODO check if the data is an actual image
                                TODO uploading pictures without name should be forbidden
                                    -->
                                <input
                                        type="file"
                                        style="display: none"
                                        ref="image"
                                        accept="image/*"
                                        @change="onFilePicked"
                                >
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Picture name*" required v-model="label"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-combobox
                                        :filter="filter"
                                        v-model="tags"
                                        :search-input.sync="search"
                                        hide-selected
                                        label="Tags"
                                        hint="You can assign multiple tags to your image. Press enter after entering one!"
                                        required
                                        multiple
                                        :items="loadedTags"
                                        small-chips
                                >
                                    <template slot="no-data">
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>
                                                    No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd>
                                                    to create a new one
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                </v-combobox>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="upload">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                imageName: '',
                imageUrl: '',
                imageFile: '',
                label: '',
                tags: [],
                search: null,
            }
        },
        computed: {
            loadedTags() {
                return this.$store.getters.updateTagArray
            },
        },
        methods: {
            emptyFields() {
                this.label = ''
                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''
                this.tags = []
            },
            edit(index, item) {
                if (!this.editing) {
                    this.editing = item
                    this.index = index
                } else {
                    this.editing = null
                    this.index = -1
                }
            },
            filter(item, queryText, itemText) {
                if (item.header) return false
                const hasValue = val => val != null ? val : ''
                const text = hasValue(itemText)
                const query = hasValue(queryText)
                return text.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            },
            callFetchTags() {
                this.$store.dispatch('fetchTags')
            },
            pickFile() {
                this.$refs.image.click()
            },

            onFilePicked(e) {
                const files = e.target.files
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
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
            },
            upload() {
                const formData = new FormData()
                formData.append('image', this.imageFile, 'image.jpg')
                formData.append('label', this.label)
                formData.append('tags', JSON.stringify(this.tags))
                fetch('/api/images/upload', {
                    method: 'POST',
                    body: formData,
                }).then(() => {
                    this.$socket.emit('newImages')
                    this.emptyFields()
                })

            },
        },
    }
</script>
