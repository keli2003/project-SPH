// 路由信息
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Resigter from '@/pages/Resigter'
import Detail from '@/pages/Detail'
export default [
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
    },
    // 产品详情页路由，
    {
        name: 'Detail',
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    }
]