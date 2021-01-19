<template>
	<div id="nav-wrap">
		<svg-icon iconClass="Vue" className="Vue"></svg-icon>
		<el-menu default-active="this.$router.path" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff" router>
			<template v-for="(item, index) in routers">
				<el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
					<!--一级菜单 分钟-->
					<template slot="title">
						<!-- <i class="el-icon-location"></i> -->
						<svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
						<span slot="title">{{item.meta.name}}</span>
					</template>
					<template v-for="subItem in item.children">
						<el-menu-item :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import { reactive, ref, computed } from '@vue/composition-api';
	export default {
		name: 'navMenu',
		setup(props,context){
			/**************************************************************************
			 * data数据
			 */
			// const isCollapse = ref(false);
			const routers = reactive(context.root.$router.options.routes);
			// console.log(routers);
			// computed 监听  ES6写法
			const isCollapse = computed(() => context.root.$store.state.isCollapse);
			
			/**************************************************************************
			 * 函数方法
			 */
			
			return {
				isCollapse,
				routers
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../styles/config.scss";
	#nav-wrap {
		position: fixed;
		top: 0px;
		left: 0px;
		height: 100vh;
		background-color: #344a5f;
		@include webkit(transition, all .5s ease 0s);		// 过渡时的缓冲时间样式
		svg {
			font-size: 64px;
			@include webkit(transition, all .5s ease 0s);		// 过渡时的缓冲时间样式
		}
		.el-submenu__title svg {
			font-size: 20px !important;
			margin: 0 10px 0 0 !important;
		}
	}
	.open {
		#nav-wrap {
			width: $navMenu;
			svg { margin: 10px 93px 0px 93px; }
		}
	}
	.close {
		#nav-wrap {
			width: $navMenuMin;
			svg { margin: 10px 0px 0px 0px;
				font-size: 64px;
			}
		}
		
	}
</style>