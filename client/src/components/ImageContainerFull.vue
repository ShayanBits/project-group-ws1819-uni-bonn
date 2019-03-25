<template>
  <div>
    <div class="admin-bar" v-if="userIsOwner">
      <v-dialog v-model="dialogEdit" width="600">
        <v-btn color="info" slot="activator" @click="setDefaultForm">Edit</v-btn>
        <v-card>
          <v-card-title primary-title class="headline grey lighten-2">Edit image data</v-card-title>
          <v-card-text>
            <v-form class="three-column-form">
              <div>
                <v-text-field label="User" v-model="user" disabled></v-text-field>
              </div>
              <div>
                <v-text-field label="Label" v-model="formData.label"></v-text-field>
              </div>
              <div>
                <v-text-field label="Author" v-model="formData.author"></v-text-field>
              </div>
            </v-form>
            <v-combobox
              v-model="formData.tags"
              hide-selected
              label="Tags"
              multiple
              :items="availableTags"
              small-chips
            >
            </v-combobox>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogEdit = false">Cancel</v-btn>
            <v-btn :color="requestStatus === STATUS.SUCCESS ? 'green' : 'primary'" @click="handleClickEdit">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" width="500">
        <v-btn color="error" slot="activator">Delete</v-btn>
        <v-card>
          <v-card-title primary-title class="headline grey lighten-2">Delete image</v-card-title>
          <v-card-text>Are you sure you want to delete this image? This cannot be undone.</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogDelete = false">Cancel</v-btn>
            <v-btn color="primary" @click="handleClickDelete">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div id="container">
      <ImageContainer
        v-bind:label="image.label"
        v-bind:path="image.path"
        @img-click="redirectToGallery"
      />
      <div id="left" @click="handleClickLeft"></div>
      <div id="right" @click="handleClickRight"></div>
    </div>
  </div>
</template>

<script>
  import ImageContainer from './ImageContainer'
  import postJson, {STATUS} from '../mixins/postJson'

  export default {
    name: 'ImageContainerFull',
    components: {ImageContainer},
    props: {
      id: String,
    },
    data() {
      return {
        dialogEdit: false,
        dialogDelete: false,
        user: null,
        formData: {
          label: null,
          author: null,
          tags: [],
        },
        requestStatus: STATUS.IDLE,
        STATUS,
      }
    },
    computed: {
      image() {
        return this.$store.getters.image(this.id) || {path: '', label: ''}
      },
      userIsOwner() {
        const user = this.$store.getters.user
        if (user && this.image.user) {
          return user.id === this.image.user._id
        }
        return false
      },
      availableTags() {
        return this.$store.getters.tags
      },
    },
    methods: {
      redirectToGallery(id = '') {
        this.$router.push('/gallery/' + id)
      },
      handleClickRight() {
        const newId = this.$store.getters.adjacentId(this.id, 1)
        this.redirectToGallery(newId)
      },
      handleClickLeft() {
        const newId = this.$store.getters.adjacentId(this.id, -1)
        this.redirectToGallery(newId)
      },
      handleClickEdit() {
        this.requestStatus = STATUS.PENDING
        postJson('/updateImageData', {_id: this.image._id, formData: this.formData})
          .then(res => {
            if (res.error !== 0) {
              this.requestStatus = STATUS.ERROR
              return
            }
            this.requestStatus = STATUS.SUCCESS
            setTimeout(() => this.requestStatus = STATUS.IDLE, 2000)
          })
      },
      handleClickDelete() {
        this.requestStatus = STATUS.PENDING
        postJson('/deleteImage', {_id: this.image._id})
          .then(res => {
            if (res.error !== 0) {
              this.requestStatus = STATUS.ERROR
              return
            }
            this.requestStatus = STATUS.SUCCESS
            setTimeout(() => {
              this.requestStatus = STATUS.IDLE
              this.redirectToGallery()
            }, 2000)
          })
      },
      setDefaultForm() {
        this.user = this.image.user ? this.image.user.name : ''
        this.formData = {
          label: this.image.label,
          author: this.image.author,
          tags: this.image.tags,
        }
      },
    },
  }
</script>

<style scoped>
  #container {
    position: relative;
    display: inline-block;
  }

  #container > img {
    display: block;
  }

  .three-column-form {
    display: flex;
  }

  .three-column-form > div {
    flex-basis: 33%;
  }

  #left,
  #right {
    position: absolute;
    top: 0;
    width: 33%;
    height: 100%;
    transition: 0.6s ease;
  }

  #left:hover,
  #right:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  #right {
    right: 0;
  }
</style>
