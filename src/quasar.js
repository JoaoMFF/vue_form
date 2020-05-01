import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import {Quasar, QInput, QToggle, QForm, QCard, QCardSection, Notify} from 'quasar'
Vue.use(Quasar, {
  config: {},
  components: {
    QInput ,
    QToggle,
    QForm,
    QCard,
    QCardSection,
  },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
    Notify
  }
 })