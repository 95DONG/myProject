import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入Echarts
import APlayer from '@moefe/vue-aplayer'
import * as echarts from 'echarts'

// 然后挂载在vue原型上
Vue.prototype.$echarts = echarts
Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(APlayer)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
