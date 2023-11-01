import { App } from 'vue'
import ModalForm from './src/index.vue'

// 让组件可以通过 use 的形式引用
export default {
  install(app: App) {
    app.component('ModalForm', ModalForm)
  },
}
