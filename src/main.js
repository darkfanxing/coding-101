import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuescroll from 'vuescroll';


Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(vuescroll);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
