<template>
	<div class="trend">
		<div class="text" :style="{ color: textColor }">
			<!-- 如果存在插槽 以插槽形式显示 -->
			<slot v-if="slots.default"></slot>
			<div v-else>{{ text }}</div>
		</div>
		<div class="icon">
			<el-icon size="0.8em" :style="{ color: !reverseColor ? upIconColor : '#52c41a' }" v-if="type === 'up'"
				><component :is="upIcon"></component
			></el-icon>
			<el-icon size="0.8em" :style="{ color: !reverseColor ? downIconColor : '#f5222d' }" v-else
				><component :is="downIcon"></component
			></el-icon>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
interface chooseIconProps {
	// 标记当前趋势是上升 up 还是下降 down
	type?: string
	// 上升趋势图标
	upIcon?: string
	/// 下降趋势图标
	downIcon?: string
	// 趋势文本
	text?: string
	// 颜色翻转只在默认情况下生效 如自定义颜色则无效
	reverseColor?: boolean
	// 上升趋势图标颜色
	upIconColor?: string
	// 下降趋势图标颜色
	downIconColor?: string
	// 上升趋势文字颜色
	upTextColor?: string
	// 下降趋势文字颜色
	downTextColor?: string
}
const props = withDefaults(defineProps<chooseIconProps>(), {
	type: 'up',
	upIcon: 'ArrowUp',
	downIcon: 'ArrowDown',
	text: '文字',
	reverseColor: false,
	upIconColor: '#f5222d',
	downIconColor: '#52c41a',
	upTextColor: 'ArrowUp',
	downTextColor: 'ArrowDown',
})

// 获取插槽内容
const slots = useSlots()

// 文字颜色
let textColor = computed(() => {
	return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang="scss" scoped>
.trend {
	display: flex;
	align-items: center;
	.text {
		font-size: 12px;
		margin-right: 4px;
	}
}
</style>
