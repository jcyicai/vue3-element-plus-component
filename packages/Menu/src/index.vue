<template>
	<el-menu :default-active="defaultActive" :router="router" v-bind="$attrs" class="el-menu-vertical-box">
		<template v-for="(item, i) in data">
			<el-menu-item v-if="!item[children] || !item[children].length" :key="i" :index="item[index]">
				<el-icon><component :is="item[icon]"></component></el-icon>
				<span>{{ item[name] }}</span>
			</el-menu-item>
			<el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
				<template #title>
					<el-icon><component :is="item[icon]"></component></el-icon>
					<span>{{ item[name] }}</span>
				</template>
				<el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem[index]">
					<el-icon><component :is="subItem[icon]"></component></el-icon>
					<span>{{ subItem[name] }}</span>
				</el-menu-item>
			</el-sub-menu>
		</template>
	</el-menu>
</template>

<script lang="ts" setup>
interface menuProps {
	// 菜单数据
	data: any[]
	// 默认选中菜单
	defaultActive?: string
	// 是否路由模式
	router?: boolean
	// 菜单标题的键名
	name?: string
	// 菜单图标的键名
	icon?: string
	// 菜单标识的键名
	index?: string
	// 菜单子菜单的键名
	children?: string
}
const props = withDefaults(defineProps<menuProps>(), {
	data: () => [],
	defaultActive: '',
	router: false,
	name: 'name',
	icon: 'icon',
	index: 'index',
	children: 'children',
})
</script>

<style lang="scss" scoped>
// 通过设置 el-aside width="auto" 可自动改变左侧菜单宽度
.el-menu-vertical-box:not(.el-menu--collapse) {
	width: 200px;
}
</style>
