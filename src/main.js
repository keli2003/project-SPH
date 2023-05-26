import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//轮播图全局组件
import Carousel from '@/components/Carousel'
//分页器的全局组件
import Pagination from '@/components/Pagination'
// 引入elementui
import { Button, MessageBox } from 'element-ui'
// 第一个参数是组件的名字 第二个组件是组件的对象
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册为全局组件
Vue.component(Button.name, Button)
// elementui 另外的一种注册方式是 挂载到原型对象身上 
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
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

// 统一接口api文件夹里面全部的请求函数
// 统一引入
import * as API from '@/api'

// 测试接口
// import { reqGetSearchInfo } from '@/api/index'
// console.log(reqGetSearchInfo({}));

// 引入图片懒加载文件
import VueLazyload from 'vue-lazyload';

// 引入图片
import atm from '@/assets/loading.gif'
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: atm
})

// 引入自定义插件
import myPlugins from './plugins/myPlugins'

Vue.use(myPlugins, {
  // name: '张三'
  name: 'upper'
})
// 引入表单验证的插件
import '@/plugins/Validate'
new Vue({
  render: h => h(App),
  // 注册路由 低下的写法省略了key[router小写]
  router,
  // 注册仓库， 组件的实例对象身上会多出一个$store的对象
  store,

  // 全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线 $bus就是当前$vm
    Vue.prototype.$API = API
  },
}).$mount('#app')
