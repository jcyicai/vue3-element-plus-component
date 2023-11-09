import type { App } from 'vue'
import ChooseCity from './src/index.vue'

// 让组件可以通过 use 的形式引用
export default {
  install(app: App) {
    app.component('ChooseCity', ChooseCity)
  }
}
