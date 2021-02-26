/*
 * 解决直接不登录进入后级页面的问题
 * 1、直接进入index页面时，参数to被改变成了 "/index"，触发路由指向，就会跑 beforeEach
 * 2、再一次next指向了login，再次发生了路由指向，再跑beforeEach，参数的to被改变成了"/login"
 * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再执行 beforeEach
 */

import router from "../router/index";  // 引入路由
import store from "../store/index";
import { getToken, removeToKen, removeUserName } from "@/utils/app.js";  // 导入getToken方法

const witeRouter = ['/login'];  // 声明白名单

/* 
 * 路由守卫
 * to: 下一个页面(要进入的页面)
 * from: 离开之前的页面(刚刚离开的页面)
 * next(): 没有参数的话则直接指向to，也不会再次执行beforeEach
 * 注：如果发生了next('/login')类似的路由指向(next带参数)就会重新执行beforeRachel
 */
router.beforeEach((to, from, next) => {
  if(getToken()){  // 判断cookie是否存在ToKen值
    if(to.path === '/login'){
      // 清除cookie里的 token和 username值
      removeToKen();  
      removeUserName();
      // 清除store里的 token和 username值
      store.commit('login/SET_TOKEN','');
      store.commit('login/SET_USERNAME','');
      next();
    }else {
      // 获取角色
      // 动态分配路由权限
      next();
    }
    console.log("存在");
  }else{
    console.log("不存在");
    // indexOf方法: 判断数组中是否存在指定的某个对象,若不存在返回-1
    if(witeRouter.indexOf(to.path) !== -1) {
      next();
    }else{
      next('/login');  // 路由指向
    }
  }
})
