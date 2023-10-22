import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './types'
import * as EleIcons from '@element-plus/icons-vue'

export default defineComponent({
	props: {
		// 菜单数据
		data: {
			type: Array as PropType<any[]>,
			required: true,
		},
		// 默认选中菜单
		defaultActive: {
			type: String,
			default: '',
		},
		// 是否路由模式
		router: {
			type: Boolean,
			default: '',
		},
		// 菜单标题的键名
		name: {
			type: String,
			default: 'name',
		},
		// 菜单图标的键名
		icon: {
			type: String,
			default: 'icon',
		},
		// 菜单标识的键名
		index: {
			type: String,
			default: 'index',
		},
		// 菜单子菜单的键名
		children: {
			type: String,
			default: 'children',
		},
	},
	setup(props, ctx) {
		// 渲染无限层级菜单
		const renderMenu = (data: any[]) => {
			return data.map((item: any) => {
				// 处理icon组件
				item.iconComp = (EleIcons as any)[item[props.icon]!]
				// 处理 subMenu 插槽
				const slots = {
					title: () => {
						return (
							<>
								<el-icon>
									<item.iconComp />
								</el-icon>
								<span>{item[props.name]}</span>
							</>
						)
					},
				}
				// 递归渲染子菜单
				if (item[props.children] && item[props.children].length) {
					return (
						<el-sub-menu index={item[props.index]} v-slots={slots}>
							{renderMenu(item[props.children])}
						</el-sub-menu>
					)
				}
				// 正常渲染
				return (
					<el-menu-item index={item[props.index]}>
						<el-icon>
							<item.iconComp />
						</el-icon>
						<span>{item[props.name]}</span>
					</el-menu-item>
				)
			})
		}

		const attrs = useAttrs()
		return () => {
			return (
				<el-menu default-active={props.defaultActive} router={props.router} {...attrs}>
					{renderMenu(props.data)}
				</el-menu>
			)
		}
	},
})
