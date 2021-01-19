/**
 * export将方法暴露出去
 * 没有使用export default时，一个文件可以使用多个export
 * 此时外部引用该文件时需要import { fileName1, fileName2, ... }
 * 过滤特殊字符
 */
export function striptscript(s){
	var pattern = new RegExp("[`~! %@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs+s.substr(i, 1).replace(pattern, '');
	}
	return rs; 
}

/**
 * 验证邮箱
 */
export function validateEmail(value){
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	// return reg.test(value) ? true : false;
	if(!reg.test(value)){
		return true;
	} else{
		return false;
	}
}

/**
 * 验证密码,6-20位的字母与数字
 */
export function validatePass(value){
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	// return !reg.test(value) ? true:false;
	if(!reg.test(value)){
		return true;
	} else{
		return false;
	}
}

/**
 * 验证验证码
 */
export function validateVcode(value){
	let reg = /^[a-zA-Z0-9]{6}$/;
	// return !reg.test(value) ? true:false;
	if(!reg.test(value)){
		return true;
	} else{
		return false;
	}
}