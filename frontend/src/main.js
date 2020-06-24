import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vSelect from "vue-select";
import VueToast from "vue-toast-notification";
import "vue-select/dist/vue-select.css";
import "vue-toast-notification/dist/theme-default.css";

Vue.config.productionTip = false;
Vue.component("v-select", vSelect);
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
