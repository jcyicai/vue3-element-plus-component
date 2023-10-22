import { App } from 'vue'
import ChooseArea from './ChooseArea'
import ChooseIcon from './ChooseIcon'
import Trend from './Trend'
import Notification from './Notification'
import NoticeList from './NoticeList'
import Menu from './Menu'

const components = [ChooseArea, ChooseIcon, Trend, Notification, NoticeList, Menu]

export default {
	install(app: App) {
		components.map((item) => {
			app.use(item)
		})
	},
}
