//  配置该项目的路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

import routes from './routes'
// 引入store
import store from '@/store'
import { removeToken } from '@/utils/token'

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
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 } //滚动条在上方
    },
})

// 全局路由守卫:前置守卫 在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
    // to：可以获取你要跳转到那个路由的信息
    // console.log(to);
    // from：可以获取到你从那个路由而来的信息
    // console.log(from);
    //next:放行函数 next()放行 next('/login')放行到指定的路由
    // console.log(next);

    next()
    // console.log(store.state.User.token);
    // console.log(store.state.User.userInfo);
    let token = store.state.User.token;
    let name = store.state.User.userInfo.name;
    console.log(name);
    if (token) {
        // 用户登录成功不能回到登录页面
        if (to.path == '/login' || to.path == '/Resigter') {
            next('/Home')
        } else {
            // 登录成功 取得其他页面【serch|detail|shopcart】
            // 用户名存在
            if (name) {
                next()
            } else {
                // 没有用户信息 派发actions请求让仓库存储用户信息
                try {
                    // 派发actions请求  获取用户信息
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 没有登录
        next()
    }
})


export default router