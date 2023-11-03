<template>
	<el-progress v-bind="$attrs" :percentage="p" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface progressProps {
	// 进度条进度
	percentage?: number
	// 进度条是否有动画效果
	isAnimation?: boolean
	// 动画时长(毫秒)
	time?: number
}
const props = withDefaults(defineProps<progressProps>(), {
	percentage: 0,
	isAnimation: false,
	time: 3000,
})

const p = ref(0)
onMounted(() => {
	if (props.isAnimation) {
		// 规定时间内加载完成
		const t = Math.ceil(props.time / props.percentage) // 总时长 / 总进度
		const timer = setInterval(() => {
			p.value += 1
			if (p.value >= props.percentage) {
				p.value = props.percentage
				clearInterval(timer)
			}
		}, t)
	} else {
		p.value = props.percentage
	}
})
</script>

<style lang="scss" scoped></style>
