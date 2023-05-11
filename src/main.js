import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//轮播图全局组件
import Carousel from '@/components/Carousel'
//分页器的全局组件
import Pagination from '@/components/Pagination'
// 第一个参数是组件的名字 第二个组件是组件的对象
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store'

// 测试
// import { reqCategoryList } from '@/api'
// reqCategoryList()

// 关闭生产提示
Vue.config.productionTip = false

// 引入mockserver.js文件
import '@/mock/mockServer'

// 引入swiper css样式
import 'swiper/css/swiper.css'

// 测试接口
// import { reqGetSearchInfo } from '@/api/index'
// console.log(reqGetSearchInfo({}));


new Vue({
  render: h => h(App),
  // 注册路由 低下的写法省略了key[router小写]
  router,
  // 注册仓库， 组件的实例对象身上会多出一个$store的对象
  store,

  // 全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线 $bus就是当前$vm
  },
}).$mount('#app')
