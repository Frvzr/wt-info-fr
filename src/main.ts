import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()

const app = createApp(App)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')
