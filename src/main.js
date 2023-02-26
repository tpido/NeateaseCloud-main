import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import "@/assets/css/normalize.css";
import "./plugins/moment";
import "./plugins/elementUI";
import "./plugins/filter.js";
require("./network/request");
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
