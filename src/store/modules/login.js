import { Login } from "@/api/login.js";
import { setToKen, setUserName, getUserName, removeToKen, removeUserName } from '@/utils/app';
// import cookie from "cookie_js";

const state = {
  // to_ken: cookie.get('token') || '',
  to_ken: '',
  username: getUserName() || ''
}
const getter = {
  username: state => state.username
}
const mutations = {
  SET_TOKEN(state, value){
    state.to_ken = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
}
const actions = {
  login(content, requestData){  // 登录
    return new Promise((resolve, reject) => {
      // 登录接口
      Login(requestData).then(response => {
        let data = response.data.data;
        console.log(data);
        // 普通的
        content.commit('SET_TOKEN', data.token);
        content.commit('SET_USERNAME', data.username);
        setToKen(data.token);
        setUserName(data.username);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    })
  },
  exit(content){
    return new Promise((resolve, reject) => {
      removeToKen();
      removeUserName();
      content.commit('SET_TOKEN', '');
      content.commit('SET_USERNAME', '');
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  getter,
  mutations,
  actions
};

/* const login = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    login(content, requestData){
      return new Promise((resolve, reject) => {
        // 登录接口
        Login(requestData).then(response => {
          resolve(response);
				}).catch(error => {
          reject(error);
				});
      })
    }
  }
}

export default login; */