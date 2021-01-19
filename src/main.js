import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from 'element-ui';
import VueCompositionApi from '@vue/composition-api';
import 'element-ui/lib/theme-chalk/index.css';
import "./icons";	// 引入自定义的组件

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

// runtime模式(运行时)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
