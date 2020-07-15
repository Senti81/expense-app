import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment

export const eventBus = new Vue();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
