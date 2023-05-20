import { reqAddress, reqOrder } from "@/api"

// 用户地址信息模块
const state = {
    address: [],
    order: []
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETUSERORDER(state, order) {
        state.order = order
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddress()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取订单交易信息
    async getUserOrder({ commit }) {
        let result = await reqOrder()
        if (result.code == 200) {
            commit('GETUSERORDER', result.data)
        }
    }
}
const getters = {}


export default {
    state, mutations, actions, getters
}