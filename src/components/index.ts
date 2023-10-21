import { App } from 'vue'
import ChooseArea from './ChooseArea'
import ChooseIcon from './ChooseIcon'
import Trend from './Trend'
import Notification from './Notification'
import NoticeList from './NoticeList'

const components = [ChooseArea, ChooseIcon, Trend, Notification, NoticeList]

export default {
	install(app: App) {
		components.map((item) => {
			app.use(item)
		})
	},
}
