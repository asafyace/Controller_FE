import Vue from "vue";
import App from "./App";
import router from "./router";
import {
  BootstrapVue,
  IconsPlugin
} from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import CircularCountDownTimer from "vue-circular-count-down-timer";



Vue.use(CircularCountDownTimer);

Vue.use(BootstrapVue);

Vue.use(IconsPlugin);

new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
