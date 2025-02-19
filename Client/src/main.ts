import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {
	Quasar,
	QBtn,
	QCard,
	QDialog,
	QInput,
	QList,
	QCardSection,
	QCardActions,
	QIcon,
	QTooltip,
	QSpinner,
	QSeparator,
	QItem, QItemSection
} from 'quasar'
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css'
import '@mdi/font/css/materialdesignicons.min.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:5001'


app.use(createPinia())
app.use(router)
app.use(Quasar, {
	components: {
		QBtn,
		QCard,
		QDialog,
		QInput,
		QList,
		QCardSection,
		QCardActions,
		QIcon,
		QTooltip,
		QSpinner,
		QSeparator,
		QItem,
		QItemSection
	}
})

app.mount('#app')
