import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/normalize.css"
import router from "./router/index.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from "./network/request"
import moment from "moment"
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$moment = moment
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
