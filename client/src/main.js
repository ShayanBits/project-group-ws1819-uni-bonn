import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Axios from 'axios'
import io from 'socket.io-client'
import 'vuetify/dist/vuetify.min.css'
 // import 'vuetify/src/stylus/main.styl'

Vue.prototype.$http = Axios

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('titleCase', (str) => {
  return str.split('_').map(item => {
    return item.charAt(0).toUpperCase() + item.substring(1)
  }).join(' ')
})
Vue.prototype.$socket = io.connect(window.location.protocol + '//' + window.location.hostname + ':3000')

new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
}).$mount('#app')


// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
