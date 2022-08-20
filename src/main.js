import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

//初始化样式
import 'normalize.css'
import './style/index.scss'

createApp(App).use(store).use(router).use('//at.alicdn.com/t/font_918300_q5yxfof3wjo.css').mount('#app')
