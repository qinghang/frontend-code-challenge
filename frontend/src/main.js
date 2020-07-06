import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import vSelect from "vue-select";
import "vue-toast-notification/dist/theme-default.css";
import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false;
Vue.use(VueToast);
Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
