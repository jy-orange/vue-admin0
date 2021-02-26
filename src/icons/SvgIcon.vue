<template>
	<svg :class="svgClass" aria-hidden="true">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
	import { reactive, ref, computed, onMounted } from '@vue/composition-api';
	export default {
		name: "svgIcon",
		// props: ['iconClass', 'className'],
		props: {	// 严格写法，iconClass和className为使用组件时传入的参数
			iconClass: {  
				type: String,	// 定义接收的值类型, 若是Boolean类型传值为(:iconClass="true")
				default: ''		// 默认值, 对象类型赋值: () => []
				// required: true,		// 值是否为必填属性
				// validator: (value) => { return value >= 0; }	// 校验规则
			},
			className: {
				type: String,
				default: ''
			}
		},
		setup(props){
			const msg = ref("jsuiadh");
			const iconName = computed(() => '#icon-' + props.iconClass);
			const svgClass = computed(() => {	// ES6，计算属性，得出最终结果并返回
				if(props.className){  // 判断类名是否存在
					return 'svg-icon ' + props.className;
				}else{
					return 'svg-icon';
				}
			});

			/* *
			 * computed:计算属性，实时监听属性变化并计算属性
			 * const icoName = computed({	// ES6
			 * 		return count.value + 1;		// 一旦count.value的值发生变化, 就会执行computed方法
			 * 		get: () => count.value + 1, 	// 默认执行该方法
			 * 		set: val => { count.value = val - 3 }
			 * });
			 */
			
			return {
				msg,
				iconName,
				svgClass
			}
		}
	}
</script>

<style lang="scss" scoped>
	.svg-icon {
		width: 1em;
		height: 1em;
		fill: currentColor;  // 通过该属性可以改变图标的颜色
		color: #fff;
	}
</style>
