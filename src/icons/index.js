import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";

// 自定义全局组件
Vue.component('svg-icon', SvgIcon);

/* * 
 * 解析svg文件
 * require.context:读取指定目录的所有文件(目录,是否遍历子级目录,定义遍历文件规则)
 * 参数: 目录、是否遍历子级目录、定义遍历文件规则
 */

const req = require.context('./svg',false,/\.svg$/);	// $符号在正则里表示结尾，读取结尾为.svg的文件
const requireAll = requireContext => {		// ES6的写法，箭头函数
	return requireContext.keys().map(requireContext);
}

// const requireAll = function(requireContext){ return requireContext.keys().map(requireContext); }		// ES5的写法

requireAll(req);