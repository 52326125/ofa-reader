import { createApp } from 'vue'
import { createPinia } from 'pinia'
import moment from 'moment'
import 'moment/dist/locale/zh-tw'

import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)
moment.locale('zh-tw')

app.use(createPinia())
app.use(router)

app.mount('#app')
