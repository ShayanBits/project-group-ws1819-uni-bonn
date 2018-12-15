import Vue from 'vue';
import Vuex from 'vuex';
import postJson from  './mixins/postJson'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gallery: {
      images: {}
    },
    savedTags:[]
  },
  mutations: {
    receiveImages(state, payload) {
      state.gallery.images = payload.images
    },
    receiveTags(state,payload){
      let savedTags = payload.map(tag => tag.name);
      state.savedTags = savedTags
    }
  },
  actions: {
    // receiveImages({commit}) {
    // }
    fetchTags(context){
      postJson('/getTags', {}).then(json => {
        let payload = json;
        context.commit('receiveTags', payload)
      })
    }
  },
  getters: {
    updateTagArray: (state) => {
       return state.savedTags
      },
    metadata: (state) => (id) => {
      const image = state.gallery.images[id]
      return image ? {path: image.path, label: image.label} : {path: '', label: ''}
    },
    // TODO: only call this when page is loaded with an id, otherwise index can be known without expensive indexOf
    adjacentId: (state) => (id, direction) => {
      const maxIndex = Object.keys(state.gallery.images).length
      const images = Object.keys(state.gallery.images)
      const currentIndex = images.indexOf(id)
      let newIndex = currentIndex
      if (direction === 1) {
        newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1
      } else if (direction === -1) {
        newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1
      }
      return images[newIndex];
    }
  },
})