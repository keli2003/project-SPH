import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)
//引入小仓库
import home from './Home'
import search from './Search'
import detail from './Detail'
import ShopCart from './ShopCart'

// 对外暴露store的实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        ShopCart
    }
});