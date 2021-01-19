<template>
	<!--
		安装composition API依赖：npm install @vue/composition-api --save
		Main.js全局注入库：
			import VueCompositionApi from '@vue/composition-api';
			Vue.use(VueCompositionApi);
	-->
	<!--
		安装axios API依赖：npm install axios或者 bower install axios
		使用cdn： <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	-->
	<div id="login">
		<div class="login-wrap"></div>
		<ul class="menu-tab">
			<li v-bind:class="{'current':item.current}" @click="toggleMenu(item)" v-bind:key="item.id" v-for="item in menuTab">{{item.txt}}</li>
		</ul>
		<!--
			for:通过for的值自动匹配id为该值的input标签，使该input标签自动获取焦点
			v-model:在表单控件或组件上创建双向绑定(input、select、textarea、component)；
			v-html:会将绑定的值的html的标签解析为页面输出而不是作为一个普通的字符串；
			v-text:将变量的值转换为一个普通的字符串输出；
			v-for:基于原数据多次渲染元素或模块；
			v-bind:绑定属性，v-bind:class或:class；
			v-show:在元素中添加display直接隐藏元素;有请求也不会请求。
			v-if:直接删除元素，当元素有接口时会请求接口;显示时若有相关接口都会被请求。
			注：v-if和v-for一起使用时，v-for的优先级更高，但不建议它们在同一标签上使用，避免产生不友好现象
		-->
		<!--表单 start-->
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size='medium'>
			
			<el-form-item prop="username" class="item-form">
				<label for="username">邮箱</label>
				<el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="password" class="item-form">
				<label for="password">密码</label>
				<el-input id="password" type="password" minlength="6" maxlength="20" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
				<label for="passwords">重复密码</label>
				<el-input id="passwords" type="password" minlength="6" maxlength="20" v-model="ruleForm.passwords" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="code" class="item-form">
				<label for="code">验证码</label>
				<el-row :gutter="10">
					<el-col :span="15">
						<el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
					</el-col>
					<el-col :span="9">
						<el-button type="success" class="block" @click="getSms()" :disabled="codeButton.status">{{codeButton.text}}</el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')" v-bind:disabled="loginButtonStatus">{{ model === 'login' ?"登录":"注册"}}</el-button>
			</el-form-item>
		</el-form>
		<!--表单 end-->
	</div>
</template>

<script>
	/**
	 * 用户名: 12235678@qq.com		密码: j123456
	 * setup函数: 用于在组件中使用Composition API的入口
	 * reactive: 声明单一对象时使用，取得一个对象并返回原始对象的响应数据处理
	 * ref: 声明基础数据类型变量时使用，返回一个ref对象，ref对象具有.value指向内部值的单个属性
	 * isRef: 用来判断数据类型，检查一个对象数否是ref对象（ isRef(obj) ）
	 * toRefs: 将reactive对象转换为ref基础数据类型对象，即取值要用value，保证对象解构或拓展运算符不会丢失原有的响应式对象的响应。
	 * 如：function useMousePosition(){
		 * const pos = reactive({
			 * x: 0,
			 * y: 0
		 * });
		 * return toRefs(pos);
	 * }
	 * const {x,y} = useMousePosition();
	 */
	/**
	 * 加密方法: basse64、md5、sha1, md5和sha1加密之后不可逆
	 * 前台密码加密: 在前端先加密一次, sha1('123456') == 'hasuogfayugup7298gdy'(加密后通过该加密方法生成的字符串)
	 * 后台加密: 接收到字符串 'hasuogfayugup7298gdy', 后台再次加密 md5('hasuogfayugup7298gdy') == 'gyqwfyqkqkte625'
	 * 最终将两次加密后的密码('gyqwfyqkqkte625')写入数据库
	 */
	import sha1 from 'js-sha1';
	import { Message } from 'element-ui';
	import { GetSms, Register, Login } from "@/api/login.js"
	import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api"
	import { striptscript, validateEmail, validatePass, validateVcode } from "../../utils/validate.js";
	export default {
		name:'login',
		setup(props,context){	// 这里面放置data数据、生命周期、自定义的函数
		// setup(props,{ refs, root }){
			var validateUsername = (rule, value, callback) => {		// 验证邮箱
				if (value === '') {
					callback(new Error("请输入邮箱！"));
				} else if(validateEmail(value)){
					callback(new Error("邮箱格式有误！"));
				}else{
					callback();		// true
				}
			};
			
			var validatePassword = (rule, value, callback) => {		// 验证密码
				ruleForm.password = striptscript(value);
				value = ruleForm.password;
				if (value === '') {
					callback(new Error("请输入密码!"));
				} else if (validatePass(value)) {
					callback(new Error("密码为6至20位的数字与字母!"));
				} else {
					callback();
				}
			};
			
			var validatePasswords = (rule, value, callback) => {	// 验证重复密码
				if(model.value === 'login') { callback(); }		// 如果模块为login直接通过
				
				ruleForm.passwords = striptscript(value);
				value = ruleForm.passwords;
				if (value === '') {
					callback(new Error("请再次输入密码!"));
				} else if (value != ruleForm.password) {	// 校验当前输入的密码与第一次输入的密码是否相同
					callback(new Error("请输入相同的密码!"));
				} else {
					callback();
				}
			};
			
			var checkAge = (rule, value, callback) => {		// 验证验证码
				// ruleForm.code = striptscript(value);
				// value = ruleForm.code;
				if (value === '') {
					return callback(new Error("请输入验证码！"));
				} else if(validateVcode(value)){
					return callback(new Error("验证码格式有误！"));
				} else {
					callback();
				}
			};
			
			/*****************************************************************************************************************
			 * 声明数据
			 */
			const ruleForm = reactive({		// 表单数据
				username: '',
				password: '',
				passwords: '',
				code: ''
			});
			const rules =reactive({		// 表单的验证
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
			});
			const menuTab = reactive([		// reactive用来声明对象
				{txt: '登录', current: true, type: 'login'},
				{txt: '注册', current: false, type: 'register'}		// register注册
			]);
			// ref的取值用model.value
			// console.log(isRef(model) ? '是基础数据' : '是对象类型')
			const model = ref('login');		// ref用来声明基础类型的数据
			const timer = ref(null);	// 倒计时
			const loginButtonStatus = ref(true);	// 登录按钮禁用状态
			const codeButton = reactive({	// 验证码按钮禁用状态和显示文字
				status: false,
				text: '获取验证码'
			});
			
			/*****************************************************************************************************************
			 * 声明函数
			 * 不建议在一个方法里面做多件不同的事(尽可能只做自己的事不做其他的事)
			 * 尽量把相同的事情封装到一个方法里面, 通过调用函数进行执行
			 */
			/**
			 * 路由 
			 * router-link
			 * 1、不带参数:
			 * <router-link :to="{name:'home'}">或<router-link :to="{path:'/home'}">
			 * 2、带参数:
			 * url的参数不可见, 刷新后参数会消失: <router-link :to="{name:'home',params:{id:'1'}}">; 路由配置path: "/home/:id"或path: "/home:id"
			 * url的参数可见, 刷新后参数不会消失: <router-link :to="{name:'home',query:{id:'1'}}">; 路由可不配置
			 * 
			 * this.$router.push() (函数里面调用)
			 * 1、不带参数:
			 * this.$router.push('/home')或this.$router.push({name:'home'})或this.$router.puth({path:'/home'})
			 * 2、query传参:url的参数可见
			 * this.$router.push({name:'home',query:{id:'1'}})或this.$router.push({path:'/home',query:{id:'1'}})
			 * 3、params传参:不配置path刷新页面参数会消失, 配置path刷新页面id会保留
			 * this.$router.push({name:'home',params:{id:'1'}}); 路由配置path: "/home/:id"或path: "/home:id"
			 * 4、query和params区别:
			 * query跳转配合路由path属性,传参为明文,url上参数可见,刷新后参数不会消失
			 * params路由跳转配合name属性传参为密文,url上参数不可见,刷新后参数会消失
			 */
			const toggleMenu = (data => {	// 注册和登录页面模块切换
				menuTab.forEach((elem,index) => { elem.current = false; });
				data.current = true;	// 高光
				model.value = data.type;	// 修改模块值
				loginButtonStatus.value = true;	// 禁用登录或注册按钮
				resetFromData();	// 重置表单
				clearcountDown();		// 还原验证码和注册/登录按钮状态
			});
			
			const resetFromData = (() => {		// 清除表单数据
				context.refs["ruleForm"].resetFields();		// 重置表单
			});
			
			const updataButtonStatus = ((params) => {		// 更新按钮状态
				codeButton.status = params.status;		// 修改验证码按钮禁用状态
				codeButton.text = params.text;		// 修改验证码按钮文字
			});
			
			const getSms = (() => {		// 获取验证码
				// 进行提示
				if(ruleForm.username == '') {
					context.root.$message.error('邮箱不能为空！！');
					// root.$message.error('邮箱不能为空！！');
					return false;
				}else if(validateEmail(ruleForm.username)){
					context.root.$message.error('邮箱格式有误，请重新输入！');
					return false;
				}
				// 请求的接口
				var data = {
					username: ruleForm.username,
					module: model.value
				};
				// 修改验证码按钮状态
				updataButtonStatus({
					status: true,
					text: '发送中'
				});
				
				// setTimeout(() => {		// 请求接口的延迟时间
				GetSms(data).then(response => {		// 返回的正确的数据
					let data = response.data;
					context.root.$message({
						showClose: true,
						message: data.message,
						type: 'success'
					});
					console.log(data.message);
					loginButtonStatus.value = false;	// 启用登录或注册按钮
					countDown(60);		// 调定时器，开始倒计时
				}).catch(error => {		// 返回的错误的数据
					console.log(error);
				});
				// },3000);
				
			});
			
			const countDown = ((number) => {	// 倒计时，定时器
				// setTimeout 只执行一次,清除:clearTimeout(变量)
				// setInterval 不断地执行，需要条件才会停止，清除:clearInterval(变量)
				if(timer.value) { clearInterval(timer.value); }	// 判断定时器是否存在，存在则清除定时器
				let time = number;
				timer.value = setInterval(() => {
					time--;
					if(time === 0) {
						clearInterval(timer.value);
						updataButtonStatus({
							status: false,
							text: '再次发送'
						});
						// codeButton.status = false;
						// codeButton.text = "再次发送";
					}else{
						codeButton.text = '倒计时' + time + '秒';
					}
				},1000);
			});
			
			const clearcountDown = (() => {		// 清除倒计时
				clearInterval(timer.value);		// 关闭定时器
				updataButtonStatus({
					status: false,
					text: '获取验证码'
				});
				// codeButton.status = false;		// 修改验证码按钮禁用状态
				// codeButton.text = "获取验证码";		// 修改验证码按钮文字
			});
			
			const login = (() => {		// 登录
				let requestData = {
					username: ruleForm.username,
					password: sha1(ruleForm.password),
					code: ruleForm.code
				};
				Login(requestData).then(response => {
					console.log(response);
					// 路由跳转
					context.root.$router.push({
						name: 'Console'
					});
				}).catch(error => {
					console.log(error);
				});
			});
			
			const register = (() => {		// 注册
				let requestData = {
					username: ruleForm.username,
					password: sha1(ruleForm.password),
					code: ruleForm.code,
					module: 'register'
				};
				Register(requestData).then(response => {	// 注册接口，注册成功
					let resData = response.data;
					context.root.$message({
						showClose: true,
						message: resData.message,
						type: 'success'
					});
					toggleMenu(menuTab[0]);
					clearcountDown();
				}).catch(error => {		// 注册失败
					console.log(error);
				});
			});
			
			// 提交表单
			const submitForm = (formName => {	// 验证表单内容是否有错
				context.refs[formName].validate((valid) => {
				// refs[formName].validate((valid) => {
					if (valid) {
						model.value === 'login' ? login() : register();
						// if(model.value === 'login'){login();}
						// else{ register(); }
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			});
			
			const resetForm = (formName => {
				context.refs[formName].resetFields();
				// refs[formName].resetFields();
			});
			
			/**
			 * 生命周期
			 */
			onMounted(() => {	// 挂载完成后
			
			})
			
			/**
			 * 将声明的东西都return出去
			 */
			return {
				menuTab,
				model,
				toggleMenu,
				submitForm,
				resetForm,
				ruleForm,
				countDown,
				rules,
				getSms,
				loginButtonStatus,
				codeButton
			}
		},

		props:{ },
		watch:{ }
	}
	// console.log(menuTab);
</script>

<style lang="scss" scoped>  // scoped 是为了防止CSS样式对其他文件的影响,只对当前vue文件有效
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
		.current { background-color: rgba($color: #000000, $alpha: .1); }
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
	.login-btn { margin-top: 19px; }
</style>
