<template>
	<div id="header-wrap">
		<div class="pull-left head-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
		<div class="pull-right head-icon">
			<div class="pull-left user-info">管理员</div>
			<div class="pull-left head-icon"><svg-icon iconClass="close" className="close" /></div>
		</div>
	</div>
</template>

<script>
	export default {
		setup(props, context){
			const navMenuState = () => {
				context.root.$store.commit('SET_COLLAPSE');
			}
			return{
				navMenuState
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../styles/config.scss";
	#header-wrap {
		position: fixed;
		top: 0;
		right: 0;
		height: 75px;
		line-height: 75px;
		background-color: #fff;
		// -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0, .1);
		@include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0, .1));	// 阴影
		@include webkit(transition, all .5s ease 0s);		// 过渡时的缓冲时间样式
		.head-icon {
			padding: 0 0 0 32px;
			svg {
				fill: currentcolor;
				color: #000;
				margin-bottom: -5px;
				font-size: 25px;
				cursor: pointer;
			}
		}
		.user-info {
			height: 100%;
			padding: 0 32px;
			border-right: 1px solid #ededed;
			+ .head-icon {
				padding: 0 28px;
			}
		}
	}
	.open {
		#header-wrap { left: $navMenu; }
	}
	.close {
		#header-wrap { left: $navMenuMin; }
	}
</style>