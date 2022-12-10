import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import * as directives from '@/directives'

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 格式化形式
import Component from '@/components'
// 过滤器
import * as filters from '@/filters'
Vue.use(Component)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

Object.keys(directives).forEach((key) => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
Object.keys(filters).forEach((key) => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
