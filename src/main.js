// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
import VueResource from 'vue-resource'
import babelpolyfill from 'babel-polyfill'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
Vue.use(ElementUI)
Vue.use(VueResource);
Vue.config.productionTip = false
	
Vue.http.options.emulateJSON = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
