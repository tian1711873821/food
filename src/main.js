// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/stylus/index.styl'

//Vue.resource
import VueResource from 'vue-resource'
Vue.use(VueResource);

//Vue.axios
// import axios from 'axios'
// import vueaxios from'vue-axios'
// Vue.use(vueaxios,axios)

import fastclick from  'fastclick'
//解决点击延迟300时间
fastclick.attach(document.body)


  Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

