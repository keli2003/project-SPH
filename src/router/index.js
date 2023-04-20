//  配置该项目的路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Resigter from '@/pages/Resigter'

// 先把vueRouter原型对象的push 先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|repalce
// 第一个参数：告诉原来的push方法 你往哪里跳转（传递那些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call和apply的区别
// 相同点：都可以调用函数一次 篡改函数的上下文一次
// 不同点：call的参数之间使用逗号隔开，apply的形式必须是数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/Home',
            component: Home,
            meta: { show: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },

            // 路由组件能不能传递props参数
            //布尔值写法
            // props: true,
            // 对象写法：额外的给路由信息传递一些props参数
            // props: { a: 1, b: 2 }
            // 函数写法：可以将params参数 query参数 通过props参数传递过去
            // props: ($route) => {
            //     return { keyword: $route.params.keyword, k: $route.query.keyword }
            // }
            props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.keyword })

        }, {
            path: '/Login',
            component: Login,
            meta: { show: false }
        }, {
            path: '/Resigter',
            component: Resigter,
            meta: { show: false }
        },
        // 重定向，项目跑起来以后，可以立马访问首页

        {
            path: '/',
            redirect: '/Home'
        }
    ]
})