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
// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/search',
            component: Search,
            meta: { show: true }
        }, {
            path: '/login',
            component: Login,
            meta: { show: false }
        }, {
            path: '/resigter',
            component: Resigter,
            meta: { show: false }
        },
        // 重定向，项目跑起来以后，可以立马访问首页

        {
            path: '*',
            redirect: '/home'
        }
    ]
})