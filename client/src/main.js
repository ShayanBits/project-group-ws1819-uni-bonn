import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 // import 'vuetify/src/stylus/main.styl'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('titleCase', (str) => {
  return str.split('_').map(item => {
    return item.charAt(0).toUpperCase() + item.substring(1)
  }).join(' ')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
