import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 5000;

Vue.prototype.$http = axios;

export const request = (config) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    withCredentials: true,
  });

  return instance(config);
};

export default axios;
