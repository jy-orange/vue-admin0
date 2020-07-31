<template>
	<div id="login">
		<div class="login-wrap"></div>
		<ul class="menu-tab">
			<li v-bind:class="{'current':item.current}" @click="toggleMenu(item)" v-bind:key="item.id" v-for="item in menuTab">{{item.txt}}</li>
		</ul>
		<!--表单 start-->
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size='medium'>
			
			<el-form-item prop="username" class="item-form">
				<label>邮箱</label>
				<el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="password" class="item-form">
				<label>密码</label>
				<el-input type="password" minlength="6" maxlength="20" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
				<label>重复密码</label>
				<el-input type="password" minlength="6" maxlength="20" v-model="ruleForm.passwords" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="code" class="item-form">
				<label>验证码</label>
				<el-row :gutter="10">
					<el-col :span="15">
						<el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
					</el-col>
					<el-col :span="9">
						<el-button type="success" class="block">获取验证码</el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>
		<!--表单 end-->
	</div>
</template>

<script>
	import { striptscript,validateEmail,validatePass,validateVcode } from '../../utils/validate.js';
	export default {
		name:'login',
		data() {
			var validateUsername = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入邮箱！'));
				} else if(validateEmail(value)){
					callback(new Error('邮箱格式有误！'));
				}else{
					callback();
				}
			};
			var validatePassword = (rule, value, callback) => {
				this.ruleForm.password = striptscript(value);
				value = this.ruleForm.password;
				if (value === '') {
					callback(new Error('请输入密码!'));
				} else if (validatePass(value)) {
					callback(new Error('密码为6至20位的数字与字母!'));
				} else {
					callback();
				}
			};
			var validatePasswords = (rule, value, callback) => {
				this.ruleForm.passwords = striptscript(value);
				value = this.ruleForm.passwords;
				if (value === '') {
					callback(new Error('请再次输入密码!'));
				} else if (value != this.ruleForm.password) {
					callback(new Error('请输入相同的密码!'));
				} else {
					callback();
				}
			};
			var checkAge = (rule, value, callback) => {
				this.ruleForm.code = striptscript(value);
				value = this.ruleForm.code;
				if (!value) {
					return callback(new Error('请输入验证码！'));
				} else if(validateVcode(value)){
					return callback(new Error('验证码格式有误！'));
				} else {
					callback();
				}
			};
			return {
				menuTab:[
					{txt: '登录', current: true, type: 'login'},
					{txt: '注册', current: false, type: 'register'}
				],
				// 模块值
				model: 'login',
				// 表单数据
				ruleForm: {
					username: '',
					password: '',
					passwords: '',
					code: ''
				},
				rules: {
					username: [
						{ validator: validateUsername, trigger: 'blur' }
					],
					password: [
						{ validator: validatePassword, trigger: 'blur' }
					],
					passwords: [
						{ validator: validatePasswords, trigger: 'blur' }
					],
					code: [
						{ validator: checkAge, trigger: 'blur' }
					]
				}
			};
		},
		methods:{
			toggleMenu(data){
				this.menuTab.forEach(elem => {
					elem.current = false;
				});
				// 高光
				data.current = true;
				// 修改模块值
				this.model = data.type;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			
		},
		props:{ },
		watch:{ }
	}
	// console.log(menuTab);
</script>

<style lang="scss" scoped>  // scoped 是为了防止CSS样式对其他文件的影响
	#login {
		height: 100vh;   // vh 是基于可视区域的比例来处理的
		background-color: #344a5f;
	}
	.login-wrap {
		width: 330px;
		margin: auto;
	}
	.menu-tab {
		text-align: center;
		li {
			display: inline-block;
			width: 88px;
			line-height: 36px;
			font-size: 14px;
			color: white;
			border-radius: 2px;
			cursor: pointer;
		}
		.current {
			background-color: rgba($color: #000000, $alpha: .1);
		}
	}
	.login-form {
		display: block;
		width: 300px;
		margin: auto;
		margin-top: 29px;
		label {
			display: block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 3px;
		}
	}
	.item-form {
		left: auto;
		margin-bottom: 13px;
	}
	.block {
		display: block;
		width: 100%;
	}
	.login-btn { margin-top: 19px }
</style>
