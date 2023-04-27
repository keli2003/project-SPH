import { reqGoodsInfo } from "@/api"

const state = {
    //产品详细的数据
    goodInfo: {}
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品信息的actions
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    }
}


const getters = {
    // 数据简化
    categoryView(state) {
        // state中的goodInfo初始状态是一个空对象 空对象的categoryView属性值是undefined

        // 当前计算出的categoryView属性值至少是一个空对象 才可以避免假报错
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    }

}


export default {
    state,
    mutations,
    actions,
    getters
}