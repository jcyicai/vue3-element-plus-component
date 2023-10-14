<template>
	<el-menu :collapse="collapse" default-active="1" class="el-menu-vertical-box">
		<el-menu-item index="1">
			<el-icon><Menu /></el-icon>
			<span>首页</span>
		</el-menu-item>
		<el-menu-item index="2">
			<el-icon><Menu /></el-icon>
			<span>图标选择器</span>
		</el-menu-item>
		<el-menu-item index="3">
			<el-icon><Menu /></el-icon>
			<span>趋势标记</span>
		</el-menu-item>
	</el-menu>
</template>

<script lang="ts" setup>
const props = defineProps<{
	collapse: boolean
}>()
</script>

<style lang="scss" scoped>
// 通过设置 el-aside width="auto" 可自动改变左侧菜单宽度
.el-menu-vertical-box:not(.el-menu--collapse) {
	width: 200px;
}
</style>
