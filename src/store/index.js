import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);  // 安装：npm install vuex --save

import layout from "./modules/layout"
import login from './modules/login';

export default new Vuex.Store({
  modules: {
    layout,
    login
  }
});
