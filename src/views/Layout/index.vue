<template>
	<div id="layout" :class="[menuStatus ? 'close' : 'open']">
		<LayoutHeader></LayoutHeader>
		<LayoutMain></LayoutMain>
		<LayoutVav></LayoutVav>
	</div>
</template>

<script>
	import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api';
	// 自定义组件名
	import LayoutHeader from './Components/Header.vue'
	import LayoutMain from './Components/Main.vue'
	import LayoutVav from './Components/Nav.vue'
	export default {
		name: 'layout',		// 自定义组件名称
		components: { LayoutHeader, LayoutMain, LayoutVav },
		setup(props,context){
			const menuStatus = computed(() => context.root.$store.state.layout.isCollapse);
			
			return {
				menuStatus
			}
		}
	}
</script>

<style lang="scss" scoped>
	#layout {
		
	}
</style>
