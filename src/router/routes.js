// 路由信息
// 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Resigter from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// // 引入二级路由
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

// 路由懒加载：
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

export default [
    {
        path: '/Home',
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
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
        component: () => import('@/pages/Login'),
        meta: { show: false }
    }, {
        path: '/Resigter',
        component: () => import('@/pages/Register'),
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
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    // 添加购物车路由
    {
        name: 'AddCartSuccess',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    //购物车模块路由
    {
        name: 'ShopCart',
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    //商品结算页路由
    {
        name: 'Trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    // 提交订单
    {
        name: 'Pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        // 路有独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    //支付成功的路由
    {
        name: 'PaySuccess',
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    // 查看订单路由
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myOrder',
                component: () => import('@/pages/Center/myOrder'),
            }, {
                path: 'groupOrder',
                component: () => import('@/pages/Center/groupOrder')
            }, {
                // 重定向，访问center路由显示myOrder组件
                path: '/',
                redirect: '/center/myOrder'
            }
        ]
    },

]