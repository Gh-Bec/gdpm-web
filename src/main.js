// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


import ElementUI, { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import service from 'axios'
Vue.prototype.$axios = service


import qs from 'qs'
Vue.prototype.$qs = qs


import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'


Vue.config.productionTip = false


// 引入全局签名加密法
import JsEncrypt from 'jsencrypt'
/**
 * 配置全局的加密方法
 * @param obj 需要加密的字符串
 */
Vue.prototype.$encruption = function (obj) {
  let encrypt = new JsEncrypt()
  // 公钥
  encrypt.setPublicKey(
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApfW1VjAPwokkETRO/8tZYigChb5+s8XZSUw2TLrY0T/8Nu2HsMxsKqvnIu4Pe+F8H+YKQhvEAzfo9ounhLeBuFy7CzqG85F2Y6HoZ8c8K9CkvjjDukDIhh5M8qfZbiUCa4NBYUl72Klg6fNpdanAmaPuuWjnDjs8K3vIQzvy3XU7AU7qWJUIb8e7wVCovVmNi6VASdvajNlrP57jexzbjBYo9SyQjkCl6RjF5AMC3a2marCAgOVDHK7AZPq2Gns5BDcqW34HUTUvMeNjoOSzfi9OrWB5TCH1Oh8uVwZSZGeg1fjKjPyLzrZJqQcR+Hc8AuXuRlAOzjn8TywPh1bxxQIDAQAB'
  )
  return encrypt.encrypt(obj)
}


import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})


let echarts = require('echarts/lib/echarts')  //  引入基本模板

// 引入折线图等组件
// require('echarts/lib/chart/line')
// require('echarts/lib/chart/radar')

require('echarts/lib/chart/pie')  // 引入饼状图组件
require('echarts/lib/chart/bar')  // 引入柱状图组件

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/legendScroll')  //  图例翻译滚动

Vue.prototype.$echarts = echarts


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})