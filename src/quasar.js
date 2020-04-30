import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import {Quasar, QInput} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QInput ,
  },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  }
 })