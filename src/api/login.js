import service from "@/utils/request"

/**
 * 获取验证码的接口
 */
export function GetSms(datas){
	return service.request({
		method: 'post',
		url: '/getSms/',
		// data
		data: datas		// 左边的data是变量名(key)后台接收的，右边的data是接收的参数。如果两者同名的话可以写成一个(ES6的写法)
	});
}

/**
 * 获取用户角色的接口
 */

/**
 * 获取登录的接口
 */
export function Login(data){
	return service.request({
		method: 'post',
		url: '/login/',
		data
	});
}

/**
 * 获取注册的接口
 */
export function Register(data){
	return service.request({
		method: 'post',
		url: '/register/',
		data
	});
}