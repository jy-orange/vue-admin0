// 这样可以区分命名空间
const state = { isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false }

const getters = { isCollapse: state => state.isCollapse }

const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse;
    // Cookie.set('isCollapse',JSON.stringify(state.isCollapse));	// cookie浏览器存储
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));	// html5本地存储
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
};

/* const layout = {
  state: {
	  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  getters: {	// computed
	  isCollapse: state => state.isCollapse
  },
  mutations: {
	  SET_COLLAPSE(state){
		  state.isCollapse = !state.isCollapse;
		  // Cookie.set('isCollapse',JSON.stringify(state.isCollapse));	// cookie浏览器存储
		  sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));	// html5本地存储
	  }
  },
  actions: {}
}

export default layout; */
