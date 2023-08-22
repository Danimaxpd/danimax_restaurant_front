import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../src/assets/template/_variables.scss';

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

const danimaxRestaurantTheme = {
  dark: false,
  colors: {
    background: '#27272f',
    surface: '#ffffff',
    primary: '#1EB980',
    'primary-darken-1': '#045D56',
    secondary: '#FD5523',
    'secondary-darken-1': '#FFFBE6',
    error: '#B00020',
    info: '#2196F3',
    success: '#B9E4C9',
    warning: '#FB8C00',
  },
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'danimaxRestaurantTheme',
    themes: {
      danimaxRestaurantTheme,
    },
  },
  blueprint: md3,
  components,
  directives,
})
// set Up
const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
