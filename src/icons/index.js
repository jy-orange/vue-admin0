import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";

// 自定义全局组件
Vue.component('svg-icon', SvgIcon);

/**
 * 解析svg文件
 * 参数: 目录、是否遍历子级目录、定义遍历文件规则
 */
const req = require.context('./svg',false,/\.svg$/);	// 正则里表示结尾，读取结尾为.svg的文件
const requireAll = (requireContext) => {		// ES6的写法
	return requireContext.keys().map(requireContext);
}

// const requireAll = function(requireContext){ return requireContext.keys().map(requireContext); }		// ES5的写法

requireAll(req);