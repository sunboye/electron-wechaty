/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-05-30 17:44:31
 * @FilePath: \electron-wechaty\src\main.js
 */
import Vue from 'vue'
import App from './webapps/App.vue'
import router from './webapps/router'
import store from './webapps/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '../public/theme/dark/theme/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
