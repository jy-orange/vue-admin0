import axios from 'axios'
import { Message } from 'element-ui';

// 创建axios，赋给变量service
// 手把手鲁码前端API，地址 http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === "production" ? '' : '/devApi';
const service = axios.create({
	baseURL: BASEURL,		// http://192.168.0.108:8080/devApi/ == http://www.web-jshtml.cn/productapi
	timeout: 15000		// 超时时间，预防请求时间过长
});

/**
 * 请求接口前, 做一些数据处理(请求拦截器)
 */
service.interceptors.request.use(function (config) {
	/**
	 * 在发送请求之前做些什么
	 * 后台需要前端这边传相关的参数(在请求头添加参数, config.headers)
	 * 如: config.headers['Tokey'] = '11111';
	 */
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

/**
 * 请求接口后, 返回数据进行拦截(响应拦截器)
 */
service.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	let data = response.data;
	// console.log(response);
	if(data.resCode !== 0) {
		Message.error(data.message);
		return Promise.reject(data);
	}else{
		return response;
	}
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default service;		// 将service暴露出去
/**
 * 使用export default时，一个文件只能存在一个default
 * 此时外部引用该文件时直接import fileName，不需要"{ }"
 */
