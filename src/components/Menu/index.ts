import { App } from 'vue'
import Menu from './src/index.vue'
import RecurMenu from './src/menu'

// 让组件可以通过 use 的形式引用
export default {
	install(app: App) {
		app.component('JcMenu', Menu)
		app.component('RecurMenu', RecurMenu)
	},
}
