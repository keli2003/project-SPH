import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router';

// 关闭生产提示
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 注册路由 低下的写法省略了key[router小写]
  router,
}).$mount('#app')
