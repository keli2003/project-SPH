//  配置该项目的路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

import routes from './routes'

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
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 } //滚动条在上方
    },
})