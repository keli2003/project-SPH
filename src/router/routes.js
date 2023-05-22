// 路由信息
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Resigter from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
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
    },
    // 添加购物车路由
    {
        name: 'AddCartSuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    //购物车模块路由
    {
        name: 'ShopCart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    //商品结算页路由
    {
        name: 'Trade',
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    // 提交订单
    {
        name: 'Pay',
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    //支付成功的路由
    {
        name: 'PaySuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    // 查看订单路由
    {
        name: 'Center',
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myOrder',
                component: MyOrder,
            }, {
                path: 'groupOrder',
                component: GroupOrder
            }, {
                // 重定向，访问center路由显示myOrder组件
                path: '/',
                redirect: '/center/myOrder'
            }
        ]
    },

]