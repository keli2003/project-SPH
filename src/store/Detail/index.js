import { reqGoodsInfo, reqAddOrUpdateShopCar } from "@/api"

const state = {
    //产品详细的数据
    goodInfo: {},


}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
}
const actions = {
    //获取产品信息的actions
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结果
        // 加入购物车以后，（发送请求） 前台将参数给服务器
        // 由于请求的时候，服务器返回的数据为空 所以不需要使用三连环操作
        let result = await reqAddOrUpdateShopCar(skuId, skuNum)
        console.log(result);
        // 加入购物车成功
        if (result.code == 200) {
            return "ok"
        } else {
            // 加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}


const getters = {

    // 路径导航数据简化信息
    categoryView(state) {
        // state中的goodInfo初始状态是一个空对象 空对象的categoryView属性值是undefined

        // 当前计算出的categoryView属性值至少是一个空对象 才可以避免假报错
        return state.goodInfo.categoryView || {};
    },
    goodInfo(state) {
        return state.goodInfo || {};
    },
    // 产品数据简化的信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 商品销售属性的列表的数据
    skuSaleAttrValueList(state) {
        return state.skuInfo.skuSaleAttrValueList || [];
    },
}


export default {
    state,
    mutations,
    actions,
    getters
}