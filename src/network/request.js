import Vue from "vue"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 5000;

Vue.prototype.$http = axios;

export default axios;