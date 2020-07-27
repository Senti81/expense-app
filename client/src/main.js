import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import { store } from './store/store'

moment.locale('de')
Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
