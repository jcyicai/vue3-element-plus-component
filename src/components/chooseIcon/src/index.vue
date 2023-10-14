<template>
	<el-button @click="handleClick" type="primary">
		<slot></slot>
	</el-button>
	<el-dialog :title="title" v-model="dialogVisible"></el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface chooseIconProps {
	// 弹出框标题
	title: string
	// 控制弹出框显示/隐藏
	visible: boolean
}
const props = withDefaults(defineProps<chooseIconProps>(), {
	title: '',
	visible: false,
})

const emits = defineEmits(['update:visible'])

// 拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)

const handleClick = () => {
	console.log(props.visible)
	emits('update:visible', !props.visible)
}

// 监听visible的变化 只能监听第一次的变化
watch(
	() => props.visible,
	(val) => {
		dialogVisible.value = val
	}
)
// 监听组件内部的dialogVisible变化
watch(
	() => dialogVisible.value,
	(val) => {
		emits('update:visible', val)
	}
)
</script>

<style lang="scss" scoped></style>
