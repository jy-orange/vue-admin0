import cookie from "cookie_js";

const adminToKen = 'admin_token';
const adminUserName = 'username';

/* 
 * Token定义: ToKen是服务端生成的一串字符串，以用作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个ToKen便将此ToKen返回给客户端，以后客户端只需要带上这个ToKen前来请求数据即可，无需再次带上用户名和密码。
 * 目的：ToKen的目的是为了减轻服务器的压力，减少频繁的查询数据库，使服务器更加健壮。
 */
// 暴露出getToken方法，通过该方法获取cookie
export function getToken(){
  return cookie.get(adminToKen);
}
export function setToKen(token){
  return cookie.set(adminToKen,token);
}
export function removeToKen(){
  return cookie.remove(adminToKen);
}

export function setUserName(value){
  return cookie.set(adminUserName, value);
}
export function getUserName(){
  return cookie.get(adminUserName);
}
export function removeUserName(){
  return cookie.remove(adminUserName);
}