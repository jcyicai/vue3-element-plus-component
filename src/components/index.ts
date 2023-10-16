import { App } from 'vue'
import ChooseArea from './ChooseArea'
import ChooseIcon from './ChooseIcon'

const components = [ChooseArea, ChooseIcon]

export default {
	install(app: App) {
		components.map((item) => {
			app.use(item)
		})
	},
}
