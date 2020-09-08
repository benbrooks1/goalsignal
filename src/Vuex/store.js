import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// Vuex Modules 
import {authModule} from './Modules/Auth'
import {apiModule} from './Modules/Api'
import {uiModule} from './Modules/Interface'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['$Auth'],
  key: "soccer-signals-STORAGE"
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    $Auth: authModule,
    $Api: apiModule,
    $Ui: uiModule
  }
})
