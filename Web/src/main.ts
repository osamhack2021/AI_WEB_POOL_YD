/* # 모듈 Import # */
// Vue
import Vue from "vue";
import App from "@/App.vue";
// 플러그인
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import "@/plugins/class-component";
import "@/plugins/timeago";
// 스타일시트
import "@/styles/main.scss";
/* # */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
