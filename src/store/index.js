import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

/**
 * 浏览器端储存(携带请求头cookie的数据, 一些敏感信息，如密码之类的)
 * 方法: 储存(cookie.set("key","value")或set({key1:'value1',key2:'value2'}))、获取(get("key")或key(["key1","key2"]))、清除(remove("key"), remove("key1","key2"), remove(['key1','key2']))
 * cookie_js: npm install cookie_js -save将数据存储于cookie中
 * 
 * HTML5本地储存(存储大小为5M, 存储于客户端, 只能存储字符串类型)
 *方法: 存储(sessionStorage.setItem("key","value"))、获取(localStorage.getItem("key"))、删除(removeItem("key"))、清空(clear())
 * sessionStorage: 暂时缓存, 关闭浏览器会自动清除存储的数据(存储临时数据或小的交互)
 * localStorage: 长期缓存, 关闭浏览器不会清除数据, 要自己手动清除数据(存储较长期的东西，如一周内免登陆)
 * 
 * JSON.parse(): 将字符串转为对象
 * JSON.stringify(): 
 */
export default new Vuex.Store({
	// 储存初始化数据
  state: {		// sessionStorage.getItem()从html5的本地存储中取值(||会优先取左边的值)
	  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  // 对state里的数据进行二次处理, this.$store.state.xxx或者this.$store.getters.xxx
  getters: {	// computed
	  isCollapse: state => state.isCollapse
  },
  // 对数据进行计算的方法全写在里面, this.$store.commit('mutationName')
  mutations: {
	  SET_COLLAPSE(state){
		  state.isCollapse = !state.isCollapse;
		  // Cookie.set('isCollapse',JSON.stringify(state.isCollapse));	// cookie浏览器存储
		  sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));	// html5本地存储
	  }
  },
  // 处理mutations中已经写好的方法, this.$store.dispatch(actionName)
  actions: {},
  // 模块化Vuex
  modules: {}
});
