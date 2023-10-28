import { App } from 'vue'
import ChooseArea from './ChooseArea'
import ChooseIcon from './ChooseIcon'
import Trend from './Trend'
import Notification from './Notification'
import NoticeList from './NoticeList'
import Menu from './Menu'
import Progress from './Progress'
import ChooseTime from './ChooseTime'
import ChooseDate from './ChooseDate'
import ChooseCity from './ChooseCity'

const components = [
	ChooseArea,
	ChooseIcon,
	Trend,
	Notification,
	NoticeList,
	Menu,
	Progress,
	ChooseTime,
	ChooseDate,
	ChooseCity,
]

export default {
	install(app: App) {
		components.map((item) => {
			app.use(item)
		})
	},
}
