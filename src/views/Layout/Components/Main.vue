<template>
	<div id="main-wrap">
		<div class="main-content">
			<div class="content"><router-view></router-view></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'layoutMain',
		setup(props,context){
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../styles/config.scss";
	#main-wrap {
		height: 100vh;
		// position: fixed;
		// left: $navMenu;
		// top: 75px;
		// right: 0;
		// bottom: 0;
		// border: 30px solid #f7f7f7;
		// border-bottom: none;
		// -webkit-box-sizing: border-box;
	}
	.main-content {
		width: 100%;
		height: 100%;
		padding-top: $layoutHeader + 30;
		padding-left: $navMenu + 30;
		padding-right: 30px;
		background-color: #f7f7f7;
		@include webkit(box-sizing,border-box);
		@include webkit(transition, all .5s ease 0s);		// 过渡时的缓冲时间样式
	}
	
	.open {
		.main-content { padding-left: $navMenu + 30; }
	}
	.close {
		.main-content { padding-left: $navMenuMin + 30; }
	}
	.content {
		width: 100%;
		height: 100%;
		padding: 30px 30px 0 30px;
		padding-top: 30px;
		padding-left: 30px;
		background: #fff;
		@include webkit(box-sizing,border-box);
	}
</style>