import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车列表中的数据
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车的某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全选的商品
    deleteAllCeheckedCart({ dispatch, getters }) {
        //context:当前小仓库 ， commit【提交mutations修改state】 dispatch【派发actions请求】 state【当前仓库中数据】 getters【计算出来的属性】
        // console.log(context);
        // 获取购物车中全部的产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        // 如果promise中有一个返回的结果是失败 那么返回的结果就是失败 反之 全部是成功 返回的结果就是成功
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的选中状态
    updateAllCartIsChecked({ dispatch, getters }, isChecked) {
        console.log(getters);
        // console.log(isChecked);
        let PromiseAll = []
        // 数组的第零项

        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })

        // 返回最终的结果
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state, mutations, actions, getters
}