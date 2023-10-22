export interface MenuItem {
	// 菜单图标
	icon?: string
	// 图标组件名字 用于 jsx
	iconComp?: any
	// 菜单名字
	name: string
	// 菜单标识
	index: string
	// 子菜单
	children?: MenuItem[]
}
